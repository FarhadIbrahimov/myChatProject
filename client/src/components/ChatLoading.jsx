import { Skeleton } from "@chakra-ui/skeleton";
import { Stack } from "@chakra-ui/layout";

const ChatLoading = () => {
  return (
    <div>
      <Stack>
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
      </Stack>
    </div>
  );
};

export default ChatLoading;
