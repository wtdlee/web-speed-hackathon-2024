import { AddIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertIcon,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Flex,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  StackItem,
  Textarea,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useCreateAuthor } from '../../../../features/authors/hooks/useCreateAuthor';
import type { CreateAuthorPayload } from '../../../../features/authors/hooks/useCreateAuthor';
import { isSupportedImage } from '../../../../lib/image/isSupportedImage';

export type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const schema = yup.object().shape({
  description: yup.string().required('プロフィールを入力してください'),
  image: yup
    .mixed((image): image is File => image instanceof File)
    .required('画像を選択してください')
    .test('is-supported-image', '対応していない画像形式です', async (file) => {
      return file == null || (await isSupportedImage(file));
    }),
  name: yup
    .string()
    .required('作者名を入力してください')
    .matches(/^[\p{Script_Extensions=Katakana}\s]+$/u, '作者名はカタカナで入力してください'),
});

export const CreateAuthorModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { mutate: createAuthor } = useCreateAuthor();
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<CreateAuthorPayload>({
    resolver: yupResolver(schema),
  });
  const imageFile = watch('image');

  const [avatarUrl, updateAvatarUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!imageFile) return;
    const url = URL.createObjectURL(imageFile);
    updateAvatarUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (values: CreateAuthorPayload) => {
    // const formData = new FormData();
    // formData.append('description', values.description);
    // formData.append('name', values.name);

    if (!values.image) return;
    // formData.append('image', values.image);

    createAuthor(values, {
      onSuccess() {
        onClose();
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent containerProps={{ p: 8 }} height="100%" m={0} overflowY="auto">
        <ModalCloseButton />
        <Box aria-label="作者追加" as="section">
          <Box as="form" onSubmit={handleSubmit(onSubmit)} p={4}>
            <Flex align="center" pb={2}>
              <Box position="relative">
                <Avatar size="xl" src={avatarUrl} />

                <FormControl
                  alignItems="center"
                  bg="rgba(0, 0, 0, 0.5)"
                  borderRadius="50%"
                  display="flex"
                  height="100%"
                  justifyContent="center"
                  left="50%"
                  position="absolute"
                  top="50%"
                  transform="translate(-50%, -50%)"
                  width="100%"
                >
                  <input
                    {...register('image')}
                    ref={fileInputRef}
                    hidden
                    multiple={false}
                    onChange={(e) => {
                      if (!e.target.files?.[0]) return;
                      setValue('image', e.target.files?.[0], { shouldValidate: true });
                    }}
                    type="file"
                  />
                  <IconButton
                    _focus={{ background: 'none' }}
                    _hover={{ background: 'none' }}
                    aria-label="作者の画像を選択"
                    background="none"
                    height="100%"
                    icon={<AddIcon color="white" />}
                    onClick={() => fileInputRef.current?.click()}
                    width="100%"
                  />
                </FormControl>
              </Box>
              <Stack p={4} spacing={2} width="100%">
                <StackItem>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <Input
                        {...field}
                        aria-label="作者名"
                        bgColor="white"
                        borderColor="gray.300"
                        placeholder="作者名"
                      />
                    )}
                  />
                </StackItem>
                <StackItem>
                  <Controller
                    control={control}
                    name="description"
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        aria-label="プロフィール"
                        bgColor="white"
                        borderColor="gray.300"
                        placeholder="プロフィール"
                      />
                    )}
                  />
                </StackItem>
              </Stack>
            </Flex>
            {isSubmitting ? (
              <Box>
                <Alert mb={4} status="info">
                  <CircularProgress isIndeterminate color="green.600" mr={2} size="1em" />
                  検証中...
                </Alert>
              </Box>
            ) : (
              <Box>
                {Object.keys(errors).map((key) => {
                  const error = errors[key as keyof typeof errors];
                  return (
                    <Alert key={key} mb={4} status="error">
                      <AlertIcon />
                      {error?.message}
                    </Alert>
                  );
                })}
              </Box>
            )}
            <Flex gap={4} justify="flex-end">
              <Button colorScheme="teal" isDisabled={isSubmitting} onClick={handleSubmit(onSubmit)} variant="solid">
                作成
              </Button>
            </Flex>
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  );
};
