import {
  Button,
  Divider,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  StackItem,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { lazy, Suspense, useId, useMemo, useState } from 'react';

import { useBookList } from '../../features/books/hooks/useBookList';
import { isContains } from '../../lib/filter/isContains';

const BookDetailModal = lazy(() => import('./internal/BookDetailModal'));
const CreateBookModal = lazy(() => import('./internal/CreateBookModal'));

const BookSearchKind = {
  AuthorId: 'AuthorId',
  AuthorName: 'AuthorName',
  BookId: 'BookId',
  BookName: 'BookName',
} as const;
type BookSearchKind = (typeof BookSearchKind)[keyof typeof BookSearchKind];

const BookModalMode = {
  Create: 'Create',
  Detail: 'Detail',
  None: 'None',
} as const;
type BookModalMode = (typeof BookModalMode)[keyof typeof BookModalMode];

type BookModalState =
  | {
      mode: typeof BookModalMode.None;
      params: object;
    }
  | {
      mode: typeof BookModalMode.Detail;
      params: { bookId: string };
    }
  | {
      mode: typeof BookModalMode.Create;
      params: object;
    };

export const BookListPage: React.FC = () => {
  const { data: bookList = [] } = useBookList();
  const bookListA11yId = useId();

  const formik = useFormik({
    initialValues: {
      kind: BookSearchKind.BookId as BookSearchKind,
      query: '',
    },
    onSubmit() {},
  });

  const { kind, query } = formik.values;

  const filteredBookList = useMemo(() => {
    if (query === '') {
      return bookList;
    }

    switch (kind) {
      case 'BookId':
        return bookList.filter((book) => book.id === query);
      case 'BookName':
        return bookList.filter(
          (book) => isContains({ query, target: book.name }) || isContains({ query, target: book.nameRuby }),
        );
      case 'AuthorId':
        return bookList.filter((book) => book.author.id === query);
      case 'AuthorName':
        return bookList.filter((book) => isContains({ query, target: book.author.name }));
      default:
        return bookList;
    }
  }, [kind, query, bookList]);

  const [modalParams, setModalParams] = useState<BookModalState>({ mode: BookModalMode.None, params: {} });

  const openDetail = (bookId: string) => {
    setModalParams({ mode: BookModalMode.Detail, params: { bookId } });
  };

  const openCreate = () => {
    setModalParams({ mode: BookModalMode.Create, params: {} });
  };

  const close = () => {
    setModalParams({ mode: BookModalMode.None, params: {} });
  };

  return (
    <>
      <Stack height="100%" p={4} spacing={6}>
        <StackItem aria-label="検索セクション" as="section">
          <RadioGroup name="kind" value={formik.values.kind}>
            <Stack direction="row" spacing={4}>
              <Radio
                color="gray.400"
                colorScheme="teal"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={BookSearchKind.BookId}
              >
                作品 ID
              </Radio>
              <Radio
                color="gray.400"
                colorScheme="teal"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={BookSearchKind.BookName}
              >
                作品名
              </Radio>
              <Radio
                color="gray.400"
                colorScheme="teal"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={BookSearchKind.AuthorId}
              >
                作者 ID
              </Radio>
              <Radio
                color="gray.400"
                colorScheme="teal"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={BookSearchKind.AuthorName}
              >
                作者名
              </Radio>
            </Stack>
          </RadioGroup>

          <Spacer height={2} />

          <Flex gap={2}>
            <Input
              borderColor="gray.400"
              name="query"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="条件を入力"
            />
          </Flex>
        </StackItem>

        <Divider />

        <StackItem
          aria-labelledby={bookListA11yId}
          as="section"
          display="flex"
          flexBasis={0}
          flexDirection="column"
          flexGrow={1}
          flexShrink={1}
          overflow="hidden"
        >
          <Flex align="center" justify="space-between">
            <Text as="h2" fontSize="xl" fontWeight="bold" id={bookListA11yId}>
              作品一覧
            </Text>
            <Button colorScheme="teal" onClick={() => openCreate()} variant="solid">
              作品を追加
            </Button>
          </Flex>
          <TableContainer flexGrow={1} flexShrink={1} overflowY="auto">
            <Table variant="striped">
              <Thead backgroundColor="white" position="sticky" top={0} zIndex={1}>
                <Tr>
                  <Th w={120}></Th>
                  <Th>作品名</Th>
                  <Th>作者名</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredBookList.length !== 0 &&
                  filteredBookList.map((book) => (
                    <Tr key={book.id}>
                      <Td textAlign="center" verticalAlign="middle">
                        <Button colorScheme="teal" onClick={() => openDetail(book.id)} variant="solid">
                          詳細
                        </Button>
                      </Td>
                      <Td verticalAlign="middle">
                        <Text fontWeight="bold">{book.name}</Text>
                        <Text color="gray.400" fontSize="small">
                          {book.id}
                        </Text>
                      </Td>
                      <Td verticalAlign="middle">
                        <Text fontWeight="bold">{book.author.name}</Text>
                        <Text color="gray.400" fontSize="small">
                          {book.author.id}
                        </Text>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </StackItem>
      </Stack>

      <Suspense fallback={<></>}>
        {modalParams.mode === BookModalMode.Detail && (
          <BookDetailModal isOpen bookId={modalParams.params.bookId} onClose={() => close()} />
        )}
        {modalParams.mode === BookModalMode.Create && <CreateBookModal isOpen onClose={() => close()} />}
      </Suspense>
    </>
  );
};
