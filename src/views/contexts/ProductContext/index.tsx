import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Product, Review } from "../../../api/entities";
import { getReviewsByProductId } from "../../../api/helpers/requests/review";
import { getProductById } from "../../../api/helpers/requests/product";
import { AuthContext } from "..";
import { convertCurrency } from "../../../api/helpers/requests/currency";

export const ProductContext = React.createContext<{
  product: Product;
  reviews: Review[];
  onUpdateReview: () => void;
  convertedPrice: number;
}>({
  product: new Product(),
  reviews: [new Review()],
  onUpdateReview: null,
  convertedPrice: null,
});

export const ProductProvider = (props: {
  children?: JSX.Element;
}): JSX.Element => {
  const { user } = useContext(AuthContext);
  const { children } = props;
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<Product>({
    product_id: 1,
    seller: user,
    title: "",
    url: "",
    description: "",
    image_url: "",
    image_alt: "",
    price: 0,
    currency: {
      currency_id: 1,
      code: "GBP",
      symbol: "$",
      gbp_exchange_rate: 1,
    },
    review_score: 0,
    review_count: 0,
  });
  const [reviews, setReviews] = useState<Review[]>([]);
  const [convertedPrice, setConvertedPrice] = useState<number>();

  const idToNumber = (id: string[] | string): number => {
    if (id instanceof Array) {
      id = id[0];
    }
    const idNumber = parseInt(id);
    return idNumber;
  };

  const getReviews = () => {
    if (!id) {
      return;
    }
    const idNumeric = idToNumber(id);
    getReviewsByProductId(idNumeric).then((reviews: Review[]) => {
      if (!reviews) {
        return;
      }
      setReviews(reviews);
    });
  };

  const getProduct = () => {
    if (!id) {
      return;
    }
    const idNumeric = idToNumber(id);
    getProductById(idNumeric).then((product: Product) => {
      if (!product) {
        return;
      }
      setProduct(product);
    });
  };

  const getConvertedPrice = () => {
    if (!product || !user?.currency?.currency_id) {
      return;
    }
    convertCurrency(product.currency, product.price, user.currency).then(
      (res) => setConvertedPrice(res)
    );
  };

  useEffect(() => {
    getProduct();
    getReviews();
    getConvertedPrice();
  }, [id]);

  useEffect(() => {
    getConvertedPrice();
  }, [product]);

  const onUpdateReview = () => {
    getReviews();
    getProduct();
  }

  return (
    <ProductContext.Provider
      value={{
        product: product,
        reviews: reviews,
        onUpdateReview: onUpdateReview,
        convertedPrice: convertedPrice,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
