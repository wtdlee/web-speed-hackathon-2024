import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Spacer, Stack } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useId } from 'react';
import * as yup from 'yup';

import { useLogin } from '../../../features/auth/hooks/useLogin';

const validationSchema = yup.object({
  email: yup.string().email('無効なメールアドレス形式です').required('メールアドレスを入力してください'),
  password: yup
    .string()
    .min(8, 'パスワードは8文字以上で入力してください')
    .matches(/[a-zA-Z].*[0-9]|[0-9].*[a-zA-Z]/, 'パスワードには英字と数字を含めてください')
    .required('パスワードを入力してください'),
});

export const LoginContent: React.FC = () => {
  const login = useLogin();
  const loginContentA11yId = useId();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      login.mutate({ email: values.email, password: values.password });
    },
    validationSchema,
  });

  return (
    <Box
      aria-labelledby={loginContentA11yId}
      as="form"
      bg="gray.100"
      borderRadius={8}
      onSubmit={formik.handleSubmit}
      p={6}
      w="100%"
    >
      <Stack spacing={4}>
        <Heading as="h1" fontSize="xl" fontWeight="bold" id={loginContentA11yId}>
          ログイン
        </Heading>

        <FormControl isInvalid={formik.touched.email && !!formik.errors.email}>
          <FormLabel>メールアドレス</FormLabel>
          <Input
            bgColor="white"
            borderColor="gray.300"
            {...formik.getFieldProps('email')}
            placeholder="メールアドレス"
          />
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.touched.password && !!formik.errors.password}>
          <FormLabel>パスワード</FormLabel>
          <Input
            bgColor="white"
            borderColor="gray.300"
            {...formik.getFieldProps('password')}
            placeholder="パスワード"
            type="password"
          />
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>

        <Spacer />

        <Button colorScheme="teal" type="submit" variant="solid">
          ログイン
        </Button>
      </Stack>
    </Box>
  );
};
