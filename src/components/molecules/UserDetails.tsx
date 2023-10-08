import { UserResponse } from "@listed-types";
import { Column, View, Text, Row, Spacer, Divider } from "native-base";

interface UserDetailsProps {
  userDetails: UserResponse;
}

const UserDetails = ({ userDetails }: UserDetailsProps) => {
  return (
    <View>
        
      <Text fontWeight="medium" color="text.500" marginBottom="1">
        ACCOUNT DETAILS
      </Text>
      <Column
        paddingY="1" 
        paddingX="4"
        borderRadius="sm"
        borderWidth="1"
        borderColor="muted.300" 
      >
        <Column paddingY="1" alignItems="center">
        <Row paddingBottom="1">
          <Text flex="1" fontSize="sm">
            Name:
          </Text>
          <Text flex="1" fontSize="sm" fontWeight="bold">
            {userDetails.name}
          </Text>
        </Row>
        
            <Divider />
          
        <Row paddingBottom="1">
          <Text flex="1" fontSize="sm">
            Username:
          </Text>
          <Text flex="1" fontSize="sm" fontWeight="bold">
            {userDetails.username}
          </Text>
        </Row>
        </Column>
      </Column>
    
    </View>
  );
};

export default UserDetails;