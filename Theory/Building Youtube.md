## Episode 14 - Machine Coding Interview and Building Youtube


## Que: What to discuss in Machine coding Interview ? 
Ans: Requirement Clarification like : 
1. Features : decide which feature you are going to Build.
2. Tech Stack : Tell the Intrerviewer Which tech stack you are using and why also.
    - Redux : state management
    - Tailwind : CSS
    - Routes : React-router-dom
    - Bundler : parcel, webhook
    - Testing : jest, react-testing-library
3. Planning Things up : How our app will look like and its functionality and break down page into different component.
4. How will you get the data for the app ?


## Que: How to create a react app and adding tailwind to it ? 
Ans: 1. "npx create-react-app app-name" here we are executing a package called create react app for once to create our app.
2. "npm i -D tailwindcss" for installing tailwind
3. "npx tailwindcss init" for adding tailwind config.
4. In "tailwind.config.js" add this line 
```js
content: [
  "./src/**/*.{js,jsx,ts,tsx}",
],
```
5. add this three lines in "index.css" file
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Que: Get Data from Youtube Video api
Ans: find the api from "youtube video api list" then add your personal "api_key" to make yt video api work. your personal api_key can be got from "youtube api key auth" then credentials.

## Que: What is reportWebVitals() ?
Ans: "reportWebVitals()" is used in React to track and analyze the performance of your web application. It helps identify any slowdowns or issues, allowing you to optimize and improve user experience.

"reportWebVitals" function accepts a callback function "onPerfEntry". When called, this function asynchronously imports the "web-vitals" library and then invokes various functions provided by the library to measure and report performance metrics like Core Web Vitals (CLS, FID, FCP, LCP, TTFB) using the "onPerfEntry" callback.

In simpler terms, it's a utility function provided by Create React App (CRA) to report performance metrics of your React application to analytics tools or monitoring services.

## Que: Difference Between useParams and useSearchParams.
Ans:"useParams" and "useSearchParams" are both React hooks provided by the "react-router-dom" library, but they serve different purposes:

1. **useParams:**
- "useParams" is used to access the parameters (route parameters) from the URL in React Router.
- It allows you to extract dynamic parameters defined in the route path, such as ":id" or ":username", and use them within your component.
- For example, if your route path is "/users/:id", "useParams" allows you to access the "id" parameter value from the URL.

```javascript
const { id } = useParams();
```

2. **useSearchParams:**
- "useSearchParams" is used to access and manipulate the query parameters (search parameters) of the URL.
- It allows you to retrieve query parameters like "?search=keyword&page=1" and modify them within your component.
- For example, if your URL is "http://example.com/search?query=react", "useSearchParams" allows you to access the "query" parameter value.

```js
const [searchParams, setSearchParams] = useSearchParams();
const query = searchParams.get('query');
```

In summary, "useParams" is used for accessing route parameters, while "useSearchParams" is used for accessing and modifying query parameters in the URL.


## Que: What is URLSearchParams ? 
Ans: URLSearchParams is a built-in JavaScript API that provides methods and properties for working with the query parameters of a URL. It allows you to parse, manipulate, and iterate over the query parameters in a URL string.

If you're using useSearchParams hook from react-router-dom, it returns an array where the first element is a URLSearchParams object representing the query parameters of the current URL.

```js
const [searchParams] = useSearchParams();
console.log(searchParams); 
```  
This will log the URLSearchParams object. Now you can access and manipulate query parameters using methods like get(), getAll(), append(), etc.


## Que: What is Debouncing ?
Ans: Debouncing is a technique used in JavaScript to control the rate at which a function is executed. It helps to optimize performance by delaying the execution of a function until after a specified time period has elapsed since the last invocation of that function.

Here's how debouncing works:

1. **Initial Trigger:** When an event (such as scrolling, typing, or resizing) occurs, it triggers the execution of a function.

2. **Delay:** Instead of immediately executing the function, debouncing introduces a delay or timeout period.

3. **Reset Timer:** If the event occurs again before the timeout period elapses, the previous timer is reset.

4. **Execution:** Once the timeout period has elapsed without any further occurrences of the event, the function is finally executed.

Debouncing is particularly useful in scenarios where rapid and frequent triggering of events could result in unnecessary or excessive function calls. By delaying the execution and consolidating multiple event occurrences into a single function call, debouncing helps to optimize performance and reduce resource consumption.

A common example of debouncing is in handling user input events like key presses or mouse movements, where you may want to perform an action (such as filtering search results or updating UI) only after the user has paused their input for a brief moment.

Debouncing in a search bar is a common technique used to optimize the performance of live search functionality. It ensures that search requests are only sent to the server after the user has stopped typing for a brief period, reducing unnecessary network traffic and server load.

Example :
Normally Difference Between two key Strokes is 
  - Typing Slow = ~200ms
  - Typing Fast = ~50ms

Debouncing with 200ms: 
  - if user key stroke is around or greater than 200ms means user is typing slow and user need some suggestions so we make api call. 
  - if user key stroke is less than 200ms means user is typing fast so we dont have to show any suggestion for that time so we dont make any api call.

Performance : 
  - if we Type "iphone pro max" fastly then suppose 14 api call will made and at that time 1000 user are typing so total call are -> 14 * 1000 = 140000 which is a lot of api calls.
  - if we Type same thing and debouncing is used then lets assume 3 API calls were made so total of -> 3 * 1000 = 3000 only calls which is very less for big application.

## Que: Implementation of Debouncing and Explaination How it Works behind the scenes ?
Ans: 
```js
//* Debouncing
useEffect(() => {
  //* Api call after every key press
  const timer = setTimeout(() => getSearchSuggestions(), 200);
  //* But if Difference between 2 Api call is less than 200ms Then Decline the Api call
  return () => {
    clearInterval(timer);
  }
}, [searchQuery]);
```

key press -> i
  - Render the  Component
  - useEffect() called
  - Start the time => make api call after 200ms

lets suppose before 200ms will over we press another key
key press -> ip
  - Now the reconciliation process is triggered
  - So Firstly the component will gets destroyed and useEffect's return method will gets called (Unmounting phase). where we decline the api call by clearing the timeout.
  - Componetn will gets re-rendered
  - useEffect(searchQuert) called
  - new timer will start and if there is no key press in between 200ms then api call will be made.


## Que: How we can Improve the above api calls Further after debouncing ?
Ans: To further optimize the API calls after debouncing, we can refine the process by implementing a caching mechanism for storing suggestions data. This approach helps prevent redundant API calls by checking if the same request has been made previously before initiating a new one. By utilizing cached data, we can minimize unnecessary network requests and enhance the efficiency of the application.
```js
useEffect(() => {
  const timer = setTimeout(() => {
    // Optimisation...
    if (searchCache[searchQuery]) {
      setSuggestions(searchCache[searchQuery]);
    }   
    else {
      getSearchSuggestions();
    }
  }, 200);
  return () => {
    clearInterval(timer);
  }
}, [searchQuery]);
```

When dealing with large amounts of data in the cache, optimization becomes crucial to maintain performance and efficiency. We can use LRU (Least Recently used) of LFU (Least Frequently Used) to store the data in the cache.


## Que: How we can Build N-Level Nested Comments ?
Ans: We can Use Reccursion to Build N-Level Nested Componet. Like This :-
```jsx
const CommentsList = ({ comments }) => {
  return comments.map(comment => (
    <div key={comment.id}>
      <Comment data={comment} />
      <div className="border border-l-black">
        
        {/** Nested Comments **/}
        <CommentsList comments={comment.replies} />

      </div>
    </div>
  ))  
};
```

and lets suppose data is in this formate 
```js
const commentsData = [
{
  "id": 1,
  "user": "Khilesh",
  "text": "Hello Kya haal chaal...",
  "replies": [
    {
      "id": 11,
      "user": "Vish",
      "text": "Good What about You ?",
      "replies":[]
    },
  ]
},
{
  "id": 2,
  "user": "Just9n",
  "text": "Which Editing Software You use ?",
  "replies":[]
},
]
```

