import { useContext, useEffect, useState } from "react";
import { ProductContext, ThemeContext, UserContext } from "../../../contexts";
import { Box, Image, Text } from "@chakra-ui/react";
import ReviewStars from "../ProductCard/components/ReviewStars";
import { SettingsContext } from "../../../contexts/SettingsContext";
import styles from "./index.module.css";
import { LANG } from "./../../../../lang";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";


export default function ProductCardFull(): JSX.Element {

  // define lang
  const { language } = useContext(UserContext);
  const lang = LANG[language];

  // fetch redux / state params
  const { product } = useContext(ProductContext);
  const { defaultImageURL } = useContext(SettingsContext);
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  // convert price
  const conversionMultiple = useSelector((state: RootState) => state.userReducer.conversionMultiple);
  const convertedPrice = product.price * conversionMultiple
  const displayPrice = `${user?.currency?.symbol ? user.currency.symbol : ""}${convertedPrice}`

  const fallback = defaultImageURL ? defaultImageURL : "";
  const image_url = product.image_url ? product.image_url : "";

  // load additional images
  const renderImages = (): JSX.Element[] => {
    return [1, 2, 3, 4].map((key: number) => {
      return (
        <Image
          key={key}
          borderColor={theme.colors.secondaryBorder}
          borderWidth={theme.sizes.borderWidth}
          borderRadius={theme.sizes.borderRadius}
          src={fallback}
          className={styles.image_option}
        />
      );
    })
  }

  // load description (add spacing)
  const renderDescription = (): JSX.Element[] => {
    return product.description.split("|").map((res) => (<Text>{res}</Text>))
  }

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.image_container}>
        <Box className={styles.image_column_container}>{renderImages()}</Box>
        <Image
          src={image_url}
          fallbackSrc={fallback}
          className={styles.image}
        />
      </Box>
      <Box className={styles.info_container}>
        <Box><Text className={styles.title} noOfLines={2}>{product.title}</Text></Box>
        <Box className={styles.review_score_container}>
          <ReviewStars reviewScore={product.review_score} />
          &bull;
          <Box>{product.review_count} {lang.REVIEWS}</Box>
        </Box>
        <Box className={styles.price_wrapper} color={theme.colors.product.border}>{displayPrice}</Box>
        <Text className={styles.about_wrapper}>{lang.ABOUT_THIS_PRODUCT}</Text>
        <Box className={styles.description}>{renderDescription()}</Box>
      </Box>
    </Box>
  );
}
