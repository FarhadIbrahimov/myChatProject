## Search User and Create Chat

created route in userRoutes

```js
router.route("/").get(allUsers);
```

created allUsers controller in userController
first i created function, added it to routes, and just logged keyword to test it out in POSTMAN,

```js
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query;

  console.log(keyword);
});
```

added allUsers to routes (imported and added .get )

```js
router.route("/").post(registerUser).get(allUsers);
router.post("/login", authUser);
```

in POSTMAN sent request GET
`http://localhost:5000/api/user?search=yourFirstName&lastname=yourLastName`

checked the console in VS code and verified that it logs first and last names

then in userController added search after query, and sent request through POSTMAN

```js
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search;

  console.log(keyword);
});
```

in VS console it logs value specified in search query which is yourFirstName according to query above
After successful testing we continue to write controller logic

```js
// /api/user , we are going to use queries to get all the users /api/user?search=userName
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          //if we have a query in the url then we are going to search for the name or email that matches the query
          //if we don't have a query in the url then we are going to return all the users

          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
});
```

### Understanding Regular Expressions in JavaScript

Regular expressions (regex or regexp) are patterns used for matching character combinations in strings. They are often used for tasks like searching, validation, and data extraction.

In the code snippet I provided, we see the usage of regex in a JavaScript route handler function. Let's break it down step by step.

`req.query.search` is a way to access the "search" query parameter from the request URL. This parameter contains the search term provided by the user.

`$or` is a MongoDB operator that specifies multiple conditions. In this case, we want to find documents that match at least one of the conditions inside the `$or` array.

`{ name: { $regex: req.query.search, $options: "i" } }` is one of the conditions. It's using the `$regex` operator, which tells MongoDB to perform a regex search. Here's what's happening:

name is the field in the MongoDB document we want to search in.

`$regex: req.query.search` is where the regex magic happens. `req.query.search` contains the user's search term. This part creates a regex pattern using that search term.

`$options: "i"` is an option that makes the regex search case-insensitive. This means it will match "John" and "john" equally.

`{ email: { $regex: req.query.search, $options: "i" } }` is similar to the previous condition but applied to the "email" field.

\*In simpler terms, this code checks if a "search" term is provided in the URL. If it is, it constructs a MongoDB query to find users whose "name" or "email" matches that term, regardless of case. If no search term is provided, it sets an empty object as the keyword, meaning it won't filter based on the search term.

Regular expressions might look complex, but they are a powerful tool for working with text data. In this case, they help create flexible and case-insensitive search queries.\*

next
we create code that performs a MongoDB query to retrieve a list of users from the "User" collection, excluding the currently authenticated user. It first uses the keyword object to specify initial search criteria (which can vary depending on your application's needs), and then it refines the results by excluding the current user based on their `_id`.

```javascript
const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
res.send(users);
```

`.find({ _id: { $ne: req.user._id } }):` After the initial .find(keyword) query, we have another .find() method chained to it. This second query refines the results based on the user's ID.

`{ $ne: req.user._id }:` This is a query condition specified using the `$ne` operator. `$ne` stands for "not equal." In this context, it's used to find documents whose `_id` is not equal to the `_id` of the currently authenticated user `(req.user._id)`. This effectively filters out the current user from the results.

[`$or` operator documentation](https://www.mongodb.com/docs/manual/reference/operator/query/or/)
[`$regex` documentation](https://www.mongodb.com/docs/manual/reference/operator/query/regex/)
[`$ne` operator documentation](https://www.mongodb.com/docs/manual/reference/operator/query/ne/)
