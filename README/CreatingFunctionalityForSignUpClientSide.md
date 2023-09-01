#### Regustered on Cloudinary

Using Cloudinary to enable picture uploading

https://api.cloudinary.com/v1_1/dfrb2aawx

--in the Product environment settings select Upload, enable Upload presets. Your project needs to be unsigned, click on the edit button next to the project name under UPLOAD PRESETS and select unsigned.
Click on Add upload preset, create the name for the project , click Save, go back to your Dashboard , click on More Info next to API environment variable and copy API BaseURL.

--go to CHAKRA-URI search for toast , follow the instructions to import it

create useState

```js
const [loading, setLoading] = useState(false);
```

then create function to upload an image,you will have to copy your cloud name as well to use it in this function

```js
const postDetails = (pics) => {
  setLoading(true);
  if (pics === undefined) {
    toast({
      title: "Please Select an Image ",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    return;
  }
  if (pics.type === "image/jpeg" || pics.type === "image/png") {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "CHATIO");
    data.append("cloud_name", "nophelet");
    fetch("https://api.cloudinary.com/v1_1/nophelet/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPic(data.url.toString());
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  } else {
    toast({
      title: "Please Select an Image ",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  }
  setLoading(false);
  return;
};
```

then you add attribute to button Sign Up

```js
isloading = { loading };
```

then create submitHandler function

```js
const submitHandler = async () => {
  setLoading(true);
  if (!name || !email || !password || !confirmPassword) {
    toast({
      title: "Please Fill All The Fields!",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setLoading(false);
    return;
  }
  if (password !== confirmPassword) {
    toast({
      title: "Passwords do not match!",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setLoading(false);
    return;
  }
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users",
      { name, email, password, pic },
      config
    );
    toast({
      title: "User Registered Successfully!",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
    setLoading(false);
    history.pushState("/chats");
  } catch (error) {
    toast({
      title: "Error Occured!",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setLoading(false);
  }
};
```

you will have to import useHistory hook, use code for reference
