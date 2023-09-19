import { BarcodeIcon, PriceTagIcon, EnterIcon, OutIcon } from "@listed-components/atoms"
import AlbumsIcon from "@listed-components/atoms/AlbumsIcon";
import WarningPointIcon from "@listed-components/atoms/WarningPointIcon";
import { toCurrency } from "@listed-utils";
import { Column, Row, Text } from "native-base"
import React from 'react'

interface ProductDetailsCardProps {
    barcode?: number;
    saleprice?: number;
    lowWarningpoint?: number;
    stocksOnHand?: number;
    totalIn?: number;
    totalOut?: number;
}

const ProductDetailsCard = ({
    barcode,
    saleprice,
    lowWarningpoint,
    stocksOnHand,
    totalIn,
    totalOut,
}: ProductDetailsCardProps) => {

    return (
        <Column paddingX="4">
            <Row paddingX="4" paddingY="2" space="4" borderBottomWidth="0.5" borderBottomColor="#D4D4D4" alignItems="center" >
                <BarcodeIcon />
                <Column space="1">
                    <Text fontSize="xs" color="text.500">BARCODE</Text>
                    <Text fontSize="sm" fontWeight="medium" fontStyle="normal" color="black">{barcode}</Text>
                </Column>
            </Row>
            <Row paddingX="4" paddingY="2" space="4" borderBottomWidth="0.5" borderBottomColor="#D4D4D4" alignItems="center" >
                <PriceTagIcon />
                <Column>
                    <Text textAlign="center" fontSize="xs" color="text.500"> SALE PRICE PER ITEM</Text>
                    <Text fontSize="sm" fontWeight="medium" fontStyle="normal" color="black">{toCurrency(saleprice as number)} </Text>
                </Column>
            </Row>

            <Row paddingX="4" paddingY="2" space="4" borderBottomWidth="0.5" borderBottomColor="#D4D4D4" alignItems="center" >
                <WarningPointIcon />
                <Column>
                    <Text fontSize="xs" color="text.500">LOW WARNING POINT</Text>
                    <Text fontSize="sm" fontWeight="medium" fontStyle="normal" color="black">{lowWarningpoint} </Text>
                </Column>
            </Row>

            <Row paddingX="4" paddingY="2" space="4" borderBottomWidth="0.5" borderBottomColor="#D4D4D4" alignItems="center" >
                <AlbumsIcon />
                <Column>
                    <Text fontSize="xs" color="text.500">STOCK ON HAND</Text>
                    <Text fontSize="sm" fontWeight="medium" fontStyle="normal" color="black">{stocksOnHand} pcs. </Text>
                </Column>
            </Row>

            <Row paddingX="4" paddingY="2" space="4" borderBottomWidth="0.5" borderBottomColor="#D4D4D4" alignItems="center" >
                <EnterIcon />
                <Column>
                    <Text fontSize="xs" color="text.500">TOTAL IN</Text>
                    <Text fontSize="sm" fontWeight="medium" fontStyle="normal" color="black">{totalIn} </Text>
                </Column>
            </Row>

            <Row paddingX="4" paddingY="2" space="4" alignItems="center" >
                <OutIcon />
                <Column>
                    <Text fontSize="xs" color="text.500">TOTAL OUT</Text>
                    <Text fontSize="sm" fontWeight="medium" fontStyle="normal" color="black">{totalOut} </Text>
                </Column>
            </Row>
        </Column>

    )
}

export default ProductDetailsCard