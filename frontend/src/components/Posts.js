import {
  Box,
  Button,
  CircularProgress,
  Input,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import useMutation from '../hooks/useMutation';
import useQuery from '../hooks/useQuery';

const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png', 'video/mp4'];
const URL = '/media';

const ErrorText = ({ children, ...props }) => (
  <Text fontSize="lg" color="red.300" {...props}>
    {children}
  </Text>
);

const Posts = () => {
  const [refetch, setRefetch] = useState(0);
  const {
    mutate: uploadMedia,
    isLoading: uploading,
    error: uploadError,
  } = useMutation({ url: URL });

  const {
    data: mediaData = [],
    isLoading: mediaLoading,
    error: fetchError,
  } = useQuery(URL, refetch);

  const [error, setError] = useState('');

  const handleUpload = async e => {
    const file = e.target.files[0];

    if (!validFileTypes.find(type => type === file.type)) {
      setError('File must be in MP4 format');
      return;
    }

    const form = new FormData();
    form.append('media', file);

    await uploadMedia(form);
    setTimeout(() => {
      setRefetch(s => s + 1);
    }, 1000);
  };

  return (
    <Box mt={6}>
      <Input id="mediaInput" type="file" hidden onChange={handleUpload} accept=".jpg,.jpeg,.png,.mp4" />
      <Button
        as="label"
        htmlFor="mediaInput"
        colorScheme="blue"
        variant="outline"
        mb={4}
        cursor="pointer"
        isLoading={uploading}
      >
        Upload
      </Button>
      {error && <ErrorText>{error}</ErrorText>}
      {uploadError && <ErrorText>{uploadError}</ErrorText>}

      <Text textAlign="left" mb={4}>
        Posts
      </Text>
      {mediaLoading && (
        <CircularProgress
          color="gray.600"
          trackColor="blue.300"
          size={7}
          thickness={10}
          isIndeterminate
        />
      )}
      {fetchError && (
        <ErrorText textAlign="left">Failed to load media</ErrorText>
      )}
      {!fetchError && mediaData?.length === 0 && (
        <Text textAlign="left" fontSize="lg" color="gray.500">
          No media found
        </Text>
      )}
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {mediaData?.length > 0 &&
          mediaData.map(url => (
            <Box as='video' controls autoplay src ={url} alt="Media" key="url"   objectFit='contain'
            sx={{
              aspectRatio: '16/9'
            }}/>
          ))}
      </SimpleGrid>

    </Box>
  );
};

export default Posts;
