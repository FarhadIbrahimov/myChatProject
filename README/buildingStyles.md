### 1.Added google font

[google fonts link here](https://fonts.google.com/specimen/Work+Sans)

### 2.Added Chakra-UI components

[chakra-ui reference here](https://chakra-ui.com/getting-started)

```js
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
```

- added Container
- inside Container added Boxes ,
  In Chakra UI, the Container component serves as a responsive wrapper for your content.
  The Box component is a versatile and fundamental building block that serves as a wrapper for styling and positioning elements. It is used for creating layout structures, applying styling, and managing spacing and positioning of content within your components. Essentially, the Box component is a lightweight and flexible container that allows you to apply various styling properties without adding any additional semantic elements to the DOM.

- applied styles to Boxes
- First Box is for the name, second Box is for Login and SignUp components, added Tabs to second Box [Tabs chakra-ui](https://chakra-ui.com/docs/components/tabs/usage)

### 3.Added VStack from chakra-ui for additional fields

[VStack chakra-ui](https://chakra-ui.com/docs/components/stack/usage)

- In Chakra UI, VStack is a layout component that stands for "vertical stack." It's used to vertically stack and align its child elements.
- FormControl, FormLabel, and Input are components commonly used together in Chakra UI to create forms with proper labels, inputs, and form control structure

```js
import { VStack } from "@chakra-ui/react";
import { Input } from "@chakra-ui/input";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
```

- after creating input fields for name, email, password, added InputGroup element from Chakra.
  In Chakra UI, InputGroup is a component that provides a way to group related input elements together, such as an input field with an associated button or icon.

  -added Show/Hide button to Password Input field using InputRightElement component from Chakra , added handleClick to Button inside the password field that will give the option to show or hide the password. Added condition to type atribute in password input to show or hide text

  ```js
  const handleCLick = () => setShow(!show);
  ```

  then

```js
<FormControl id="password" isRequired>
  <FormLabel mt="5">Password</FormLabel>
  <InputGroup>
    <Input
      type={show ? "text" : "password"}
      placeholder="Enter Your Password"
      onChange={(e) => setPassword(e.target.value)}
    />
    <InputRightElement>
      <Button h="1.85rem" size="sm" mr="1" onClick={handleCLick}>
        {show ? "Hide" : "Show"}
      </Button>
    </InputRightElement>
  </InputGroup>
</FormControl>
```
