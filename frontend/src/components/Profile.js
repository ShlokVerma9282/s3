import { Box, Image, Text, VStack } from '@chakra-ui/react';
import Posts from './Posts';
import img from '../data/aws.png';
const Profile = () => {
  return (
    <Box>
      <VStack p={7} m="auto" width="fit-content" borderRadius={6} bg="gray.700">
        <Image
          borderRadius="full"
          boxSize="100px"
          src={img}
          alt="Profile"
        />
        <Text>AWS Test Project</Text>
        <Text fontSize="lg" color="gray.400">
          Video Upload
        </Text>
      </VStack>

      <Posts />
    </Box>
  );
};
export default Profile;
