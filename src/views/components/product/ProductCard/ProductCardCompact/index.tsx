import { Box, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import ReviewStars from "../components/ReviewStars";
import { Product } from "../../../../../api/entities";
import { SettingsContext } from "../../../../contexts/SettingsContext";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store/store";
import styles from "./index.module.css";


export default function ProductCardCompact(product: Product): JSX.Element {

  // fetch redux parameters
  const conversionMultiple = useSelector((state: RootState) => state.userReducer.conversionMultiple);
  const userCurrencySymbol = useSelector((state: RootState) => state.userReducer.userCurrencySymbol);

  const { base_url, defaultImageURL } = useContext(SettingsContext);

  // image parameters
  const image_url = product.image_url ? product.image_url : "#";
  const fallback_url = defaultImageURL ? defaultImageURL : "";
  const alt = product.image_alt ? product.image_alt : "";

  // convert price
  const convertedPrice = product.price * conversionMultiple;
  const displayPrice = `${userCurrencySymbol}${convertedPrice}`;

  return (

    <Link href={`${base_url}/product/${product.product_id}`}>
      <Box className={styles.container}>
        <Image className={styles.image} src={image_url} fallbackSrc={fallback_url} alt={alt} />
        <Box className={styles.info_wrapper}>
          <Box className={styles.info_container}>
            <Box className={styles.product_name_container}>
              <Text noOfLines={2}>{product.title}</Text>
            </Box>
            <Box className={styles.price_review_container}>
              <Box className={styles.price_wrapper} fontWeight={550}>{displayPrice}</Box>
              <ReviewStars reviewScore={product.review_score} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}
