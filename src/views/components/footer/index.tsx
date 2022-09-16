import { Box } from "@chakra-ui/react";

export default function Footer(props: any): JSX.Element {
  const renderColumn = (title: string, items: string[]): JSX.Element => {
    return (
      <Box w="25%" display="flex" flexDirection="column" alignItems="left">
        <Box h="30%">
          <b>{title}</b>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-evenly"
          h="70%"
        >
          {items.map((v: string, i) => {
            return (
              <Box key={i} fontSize="10px">
                {v}
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  };

  return (
    <Box
      w="100%"
      h="150px"
      display="flex"
      flexDirection="row"
      bottom="0"
      bgColor="#232f3e"
      textColor="whiteAlpha.800"
      paddingX="5px"
    >
      {renderColumn("Get to know us", [
        "About Us",
        "Careers",
        "Modern Slavery Statement",
      ])}
      {renderColumn("Make Money with Us", [
        "Sell on Amazon",
        "Sell on Amazon Business",
        "Sell on Amazon Handmade",
        "Amazon Pay",
      ])}
      {renderColumn("Amazon Payment Methods", [
        "Amazon Classic Mastercard",
        "Amazon Money Store",
        "Gift Cards",
        "Amazon Currency Converter",
      ])}
      {renderColumn("Let Us Help You", [
        "Track packages",
        "Amazon prime",
        "Recycling",
        "Amazon Assistant",
      ])}
    </Box>
  );
}
