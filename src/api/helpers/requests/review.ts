import { ReviewType } from "../../../types/Review";
import { Review } from "../../entities";
import axios from "axios";
import { routes } from "../../routes";
import { insertIdIntoUrl } from "../../utils/formatting";

export async function postReview(review: Review): Promise<any> {
  const route = insertIdIntoUrl(
    routes.user.add_review,
    "user",
    review.user.user_id
  );
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
  const request = await postReview(review);
  return request;
}

export async function getReviewsByProductId(id: number): Promise<Review[]> {
  const route = insertIdIntoUrl(routes.product.reviews, "product", id);
  const request = await axios(route, {
    method: "GET",
  });
  return request.data.reviews;
}
