import AccountButton from "../views/components/navigation/AccountButton";
import { ProductCardType } from "../views/components/product/types/ProductCardType";
import { CurrencyCode, AddressType } from "../types";
import Navigation from "../views/components/navigation";
// import { callAPI } from "../models";
// import axios from 'axios';
// import createAllTablesQuery from "../models/modelCreation/index";

export default function Home() {
  const props: ProductCardType = {
    title: 'Sample product',
    description: 'Description',
    imageURL: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pink-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1645572315935',
    price: 120,
    currencyCode: CurrencyCode.GBP,
    reviewScore: 4.3,
    reviewCount: 90000
  };

  const address: AddressType = {
    name: 'Joshua',
    number: '33',
    county: 'Cardiff',
    postcode: 'CF23 9BN'
  }

  const propsArray: ProductCardType[] = [props, props, props];

  // axios.get('/api/posts')
  //        .then((response) => {
  //           console.log(response)
  //        })
  //        .catch((e) => console.log(e))

  // createAllTablesQuery();

  return (
    // <ProductCardWrapper {...{productList: propsArray}}>
    // </ProductCardWrapper>
    <Navigation />
  )
}