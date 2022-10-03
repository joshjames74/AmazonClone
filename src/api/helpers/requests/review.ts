import { ReviewType } from "../../../types/Review";
import { Review } from "../../entities";
import axios from "axios";
import { routes } from "../../routes";
import { insertIdIntoUrl } from "../../utils/formatting";
import { getUserById } from "./user";
import { CurrencyCode } from "../../../types";

// export function toReviewEntity(
//   review: ReviewType,
//   product_id: number,
//   user_id: number
// ): Review {
//   const reviewEntity = new Review();
//   reviewEntity.product_id = product_id;
//   reviewEntity.content = review.content;
//   reviewEntity.date = review.date;
//   reviewEntity.score = review.score;
//   reviewEntity.user_id = user_id;
//   reviewEntity.image_urls = "";
//   reviewEntity.title = review.title;
//   return reviewEntity;
// }

export async function postReview(review: Review): Promise<any> {
  const route = insertIdIntoUrl(
    routes.user.add_review,
    "user",
    review.user.user_id
  );
  console.log(`Route: ${route}`);
  console.log(review);
  const request = await axios(route, {
    method: "POST",
    data: {
      review: review,
    },
  });
  return request;
}

export async function deleteReview(review: Review): Promise<any> {
  const route = insertIdIntoUrl(
    routes.user.delete_review,
    "user",
    review.user.user_id
  );
  const request = await axios(route, {
    method: "DELETE",
    data: {
      review: review,
    },
  });
  return request;
}

export async function addReview(review: Review): Promise<any> {
  //const reviewEntity = toReviewEntity(review, product_id, user_id);
  const request = await postReview(review);
  console.log(request);
  return request;
}

export async function getReviewsByProductId(id: number): Promise<Review[]> {
  const route = insertIdIntoUrl(routes.product.reviews, "product", id);
  const request = await axios(route, {
    method: "GET",
  });
  console.log(request);
  return request.data.reviews;
}

// export async function getReviewListByProductId(
//   id: number
// ): Promise<ReviewType[]> {
//   const reviews = await getReviewsByProductId(id);
//   let reviewList = [];
//   for (const review of Array.from(reviews)) {
//     const user = await getUserById(review.user);
//     const reviewType: ReviewType = {
//       // userInfo: {
//       //     userId: user.user_id,
//       //     firstName: user.first_name,
//       //     userName: user.user_name,
//       //     addresses: [],
//       //     countryCode: `${user.country}`,
//       //     currencyCode: CurrencyCode[user.currency.code],
//       // },
//       userInfo: {
//         userId: 1,
//         firstName: "Joshua",
//         userName: "joshuajames",
//         addresses: [],
//         countryCode: `UK`,
//         currencyCode: CurrencyCode.GBP,
//       },
//       score: review.score,
//       title: review.title,
//       content: review.content,
//       date: review.date,
//       images: [review.image_urls],
//     };
//     reviewList.push(reviewType);
//   }
//   console.log(`Review list: ${reviewList}`);
//   return reviewList;
// }
