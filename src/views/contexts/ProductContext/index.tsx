import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Product, Review } from "../../../api/entities";
import { getReviewsByProductId } from "../../../api/helpers/requests/review";
import { getProductById } from "../../../api/helpers/requests/product";
import { AuthContext } from "..";

export const ProductContext = React.createContext<{
  product: Product;
  reviews: Review[];
  onUpdateReview: () => void;
}>({
  product: new Product(),
  reviews: [new Review()],
  onUpdateReview: null,
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
    },
    review_score: 0,
    review_count: 0,
  });
  const [reviews, setReviews] = useState<Review[]>([]);

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

  useEffect(() => {
    getProduct();
    getReviews();
    // if (!id) {
    //     return;
    // }
    // const idNumeric = idToNumber(id);
    // getProductInfoById(idNumeric).then((product: ProductInfo) => {
    //     if (!product) {
    //         return
    //     };
    //     console.log(product);
    //     setProductInfo(product);
    // })
    // getReviewListByProductId(idNumeric).then((reviews: ReviewType[]) => {
    //     if (!reviews) {
    //         return
    //     }
    //     setReviewList(reviews);
    // })
  }, [id]);

  return (
    <ProductContext.Provider
      value={{
        product: product,
        reviews: reviews,
        onUpdateReview: getReviews,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
