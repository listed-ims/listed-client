import { BoardIcon } from "@listed-components/atoms";
import { Column,Text } from "native-base";

  interface NoTransactionsProps{
    filtered?: boolean;
  }

const NoTransactions =({filtered =false}: NoTransactionsProps) =>{

  return(
     <Column
     alignItems="center"
     paddingY="8"
     height="full"
     space="4"
     justifyContent="center"
    >
      <BoardIcon/>
      <Column display="flex"  justifyContent="center" alignItems="center" alignSelf="stretch" space="1">
        <Text textAlign="center" fontSize="lg" fontWeight="semibold"> 
          No Transactions
        </Text>   
        {filtered ? 
          <Text textAlign="center" fontSize="xs">
          You don't have any recorded transactions with the applied FILTERS.
         </Text>:
          <Text fontSize="xs" textAlign="center" >
          You don't have any recorded transactions yet.
        </Text>
       
        }
      </Column>
    </Column>

  );
}
export default NoTransactions;