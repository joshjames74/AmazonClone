import { Box, Image, Text } from "@chakra-ui/react";
import ReviewStars from "../components/ReviewStars";
import { Product } from "../../../../../api/entities";
import Link from "next/link";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import { useContext } from "react";
import { SettingsContext } from "../../../../contexts/SettingsContext";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store/store";
import styles from "./index.module.css";
import { LANG } from "./../../../../../lang";
import { UserContext } from "../../../../contexts";


export default function ProductCardWide(product: Product): JSX.Element {

  // define lang
  const { language } = useContext(UserContext);
  const lang = LANG[language];

  // fetch data from contexts
  const { theme } = useContext(ThemeContext);
  const { base_url, defaultImageURL } = useContext(SettingsContext);

  // fetch data from redux
  const userCurrencySymbol = useSelector((state: RootState) => state.userReducer.userCurrencySymbol);
  const conversionMultiple = useSelector((state: RootState) => state.userReducer.conversionMultiple);

  // image data
  const image_url = product.image_url ? product.image_url : "";
  const fallback = defaultImageURL ? defaultImageURL : "";
  const alt = product.image_alt ? product.image_alt : "";

  // convert price
  const convertedPrice = product.price * conversionMultiple;
  const displayPrice = `${userCurrencySymbol}${convertedPrice}`

  // review message
  const displayReview = `(${product.review_count} ${lang.REVIEWS})`

  return (
    <Link href={`${ base_url}/product/${product.product_id}`}>
      <Box className={styles.container} borderColor={theme.colors.secondaryBorder}>
        <Image className={styles.image} src={image_url} fallbackSrc={fallback} 
               alt={alt}  />
        <Box className={styles.info_container}>
          <Box className={styles.title_wrapper}>
            <Text noOfLines={2}>{product.title}</Text>
          </Box>
          <Box className={styles.price_review_container}>
            <Text className={styles.price_wrapper} color={theme.colors.primaryAccent}>
              {displayPrice}
            </Text>
            <Box className={styles.review_wrapper}>
              <ReviewStars reviewScore={product.review_score} />
              <Text className={styles.review_score}>{displayReview}</Text>
            </Box>
          </Box>
          <Box className={styles.description_container}>
            <Text className={styles.description} noOfLines={1}>
              {product.description}
            </Text>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}
