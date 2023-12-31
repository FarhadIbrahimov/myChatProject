import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {
  const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      history.push("/chats");
    }
  }, [history]);

  return (
    <Container maxW="x1" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={1}
        bg={"white"}
        w="55%"
        m="40px 0 15px 0"
        borderRadius="md"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work Sans" fontWeight="bold">
          CHATIO
        </Text>
      </Box>
      <Box
        bg="white"
        w="55%"
        p={4}
        borderRadius="lg"
        color="black"
        borderWidth="1px"
      >
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%" fontWeight="bold">
              Login
            </Tab>
            <Tab width="50%" fontWeight="bold">
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
