import pandas as pd
import string
import psycopg2
from config import load_config
import re

df = pd.read_csv("../../amazon.csv")
categories_df = pd.read_csv("../../category.csv")

## create the category tree

def set_category_parents(df) -> dict:
    # split each category list
    category_col = df['category']

    # create categories dictionary {child: parent}
    catHash = dict()

    # iterate rows
    for row in category_col:
        # split into each category and reverse
        categories = row.split("|")[::-1]
        # iterate in reverse, set the next category and its parent
        i = 0
        for i in range(len(categories) - 1):
            if catHash.get(categories[i]):
                if catHash[categories[i]] != categories[i+1]:
                    print(f"Collision. Child={categories[i]}. Parents=[{catHash[categories[i]], categories[i+1]}]")
            else:
                catHash[categories[i]] = categories[i+1]
        # for the final element, if it's not in the hash, set it to none
        if not catHash.get(categories[-1]):
            catHash[categories[-1]] = ""

    return catHash

def clean_category_name(name: str) -> str:
   
    # add a space around ambersands
    i = 0
    while i < len(name):
        if name[i] == "&":
            if i == 0:
                name = name[i] + " " + name[i+1:]
                i += 1
            if i == len(name) - 1:
                name = name[0:i] + " " + name[i]
                i += 1
            else:
                name = name[0:i] + " " + name[i] + " " + name[i+1:]
                i += 1
        i += 1
    
    # add space for new words
    prev_lower_or_comma = False
    i = 0
    while i < len(name):
        if prev_lower_or_comma:
            if name[i] in list(string.ascii_uppercase):
                name = name[0:i] + " " + name[i:]
                prev_lower_or_comma = False
        if name[i] in list(string.ascii_lowercase) or name[i] == ",":
            prev_lower_or_comma = True
        i += 1

    return name

def create_query2(child: str, parent: str) -> str:
    table_name = "category"
    
    if not parent:
        query = f"INSERT INTO {table_name}(name) VALUES(\'{child}\');"
        try:
            config = load_config()
            with psycopg2.connect(**config) as conn:
                with conn.cursor() as cur:
                    # execute the CREATE TABLE statement
                    cur.execute(query)
                    print(cur.fetchall())
        except (psycopg2.DatabaseError, Exception) as error:
            print(error)
        return query
    
    # add parent if not exists
    add_parent = f"INSERT INTO {table_name}(name) VALUES(\'{parent}\');"

    # get parent category id
    parent_id = f"SELECT category_id FROM {table_name} WHERE name = \'{parent}\'"
    
    try:
        config = load_config()
        with psycopg2.connect(**config) as conn:
            with conn.cursor() as cur:
                # execute the CREATE TABLE statement
                
                # check if parent exists
                cur.execute(parent_id)

                if not cur.fetchone():
                    cur.execute(add_parent)
                    print(cur.fetchall(), "first")

                    # check if parent exists
                    cur.execute(parent_id)

                id = cur.fetchone()
                print(id, "here")

                # add child to db
                add_child = f"INSERT INTO {table_name} (name, parentCategoryId) VALUES (\'{child}\', \'{id}\')"
                cur.execute(add_child)
                print(cur.fetchall())

    except (psycopg2.DatabaseError, Exception) as error:
        print(error)

    return ""

def save_as_csv(df):
    category_dict = set_category_parents(df)
    clean_category_dict = dict()
    for key, item in category_dict.items():
        clean_category_dict[clean_category_name(key)] = clean_category_name(category_dict[key])
    
    # convert to 
        
def clean_price(price: str) -> str:
    price = list(price)
    i = 0
    while i < len(price):
        if price[i].isdigit():
            i += 1
        else:
            del price[i]
    return "".join(price)

def clean_appostrophes(string: str) -> str:
    return string.replace("\'", "").replace('"', "")

    
def clean_cols(df: pd.DataFrame) -> pd.DataFrame:
    # take only required columns
    df = df[["product_name", "actual_price", "about_product", "img_link"]]
    df['actual_price'] = df['actual_price'].apply(clean_price)
    df['product_name'] = df['product_name'].apply(clean_appostrophes)
    df['about_product'] = df['about_product'].apply(clean_appostrophes)
    
    shorten = lambda x : x[0:100]
    df['product_name'] = df['product_name'].apply(shorten)
    
    return df

def create_query(name: str, price: str, about: str, img: str) -> str:
    table_name = "product"
    cols_name = "(title,description,image_alt,price,review_score,review_count,url, image_url)"
    values_name = f"('{name}','{about}','','{price}',0,0,'','{img}')"
    query = f"INSERT INTO {table_name}{cols_name} VALUES{values_name};"
    return query


def set_currency() -> str:

    # first get the GBP currency object
    currency_table_name = "currency"
    currency_id = 1

    product_table_name = "product"


    try:
        config = load_config()
        with psycopg2.connect(**config) as conn:
            with conn.cursor() as cur:

                query = f"SELECT * FROM {currency_table_name} WHERE currency_id = {currency_id}"
                cur.execute(query)
                currency = cur.fetchone()
                print(currency)

                # next, set this as the currency for each product

                product_query = f"UPDATE {product_table_name} SET currencycurrencyid = {currency} WHERE product_id IS NOT NULL"
                cur.execute(product_query)

                

    except (psycopg2.DatabaseError, Exception) as error:
        print(error)


def run_queries(df):

    print(df)

    queries = []

    for index, row in df.iterrows():
        name = row['product_name']
        price = row['actual_price']
        about = row['about_product']
        img = row['img_link']
        queries.append(create_query(name, price, about, img))
    try:
        config = load_config()
        with psycopg2.connect(**config) as conn:
            with conn.cursor() as cur:
                # execute the CREATE TABLE statement
                for query in queries:
                    cur.execute(query)
    except (psycopg2.DatabaseError, Exception) as error:
        print(query)
        print(error)
        
# run_queries(clean_cols(df))
        
def get_categories_unique(df) -> list:

    cateogories_column = df['category']
    categories = set()
    for category_list in cateogories_column:
        #print(category_list)
        individual_list = category_list.split("|")
        for individual in individual_list:
            categories.add(individual)

    return list(categories)


def add_categories_query(categories: list) -> list:

    query = lambda x : f"INSERT INTO category(name) VALUES  ('{x}');"

    return [query(cat) for cat in categories]



def get_product_categories(df: pd.DataFrame, product: string) -> list:


    categories = df.loc[df['product_name'] == product, 'category'].iloc[0]
    categories = categories.split("|")
    return categories


def get_category_ids(df: pd.DataFrame) -> pd.DataFrame:

    df["product_name"] = df["product_name"].str.slice(0, 100)
    df['Category_list'] = df["product_name"].apply(lambda x : get_product_categories(df, x))
    df['Category_ids'] = df["Category_list"].apply(lambda x : [
        categories_df.loc[categories_df["name"] == category, "category_id"].iloc[0] for category in x
    ])

    return df


def categories_query(df: pd.DataFrame) -> list:

    query = lambda x, t : f"UPDATE product SET category_ids = array{x} WHERE title = '{t}';"

    queries = []

    for index, row in df.iterrows():
        category_ids = row["Category_ids"]
        title = row["product_name"].replace("'", "").replace('"', "")
        queries.append(query(category_ids, title))

    return queries


def save_list_to_file(filename, string_list):
    with open(filename, 'w', encoding="UTF-8") as file:
        for string in string_list:
            file.write(string + '\n')


new_df = get_category_ids(df)
queries = categories_query(new_df)
save_list_to_file("update_query.txt", queries)
