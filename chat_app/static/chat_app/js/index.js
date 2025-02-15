const messageInput = document.getElementById("messageInput");
const sendMessageBtn = document.getElementById("sendMessageBtn");
const messagesContainer = document.querySelector(".messages");
const themeButton = document.querySelector("#theme-btn");
const suggestionClass = document.querySelector(".suggestions");
const showSug = document.querySelector("#showSug");
const themeSw = document.querySelector("#themeSw");
const htSw = document.querySelector("#htSw");
const killSw = document.querySelector("#killSw");
const themeColor = localStorage.getItem("themeColor");
const modal = document.querySelector(".modal");
const chat = document.querySelector(".chat");
const myName = document.querySelector(".myName");
const statusP = document.querySelector(".status");
const defaultText = document.querySelector(".default-text");
const sendSvg = document.querySelector(".w-6-h-6");
const kk = document.querySelector("#kk");
const userName = document.getElementById("name");
const ts = document.querySelector(".timestamp");
const newChat = document.querySelector(".new-chat");
const clearConvo = document.querySelector(".clear-convo");
const modalOverlay = document.querySelector(".modal-overlay");
const initialsSpan = document.querySelector("#initials");
const scrollButton = document.createElement("button");
const scrollButton1 = document.querySelector(".scroll-button1");
const sol = document.querySelector(".sol");
const mute = document.querySelector(".mute");
// Create a new SpeechSynthesisUtterance object
var speech;
try {
    speech = new SpeechSynthesisUtterance();
    // Set additional properties if needed (optional)
    speech.lang = "en-US"; // Set the language
    speech.volume = 1; // Set the volume (0 to 1)
    speech.rate = 1.2; // Set the rate (0.1 to 10)
    speech.pitch = 1; // Set the pitch (0 to 2)
    console.log('Speech synthesis set up successfully!!')

} catch (error) {
    console.log('Sorry!! Your browser does not support speech synthesis!!')
}


let m;


let userText = "";
let state = true;
let generating = true;
let autoScroll = true;
let assistDivM;
let typingAnimation;
let animateText = null;
let targetElement = null;
let isSpeaking = null;
let currentTextIndex = 0;
let currentResponseIndex = 0;
const defaultResponse =
    'Hello there!! This is MksU virtual assistant at your service. I\'ll be happy to help you with whatever inquiry you have about our institution! For further inquiries please find us at <a href="https://docs.chatgpt.com">https://myorg.help</a>.';
const list = [
    "Hello there.",
    "Good morning",
    "E-Learning.",
    "Fees inquiries.",
    "Students portal.",
    "Curriculum offered.",
    "Exam bank.",
    "Units registration."
];
var messages1 = [
    {
        message: [
            {
                text: "text",
                responses: [
                    'Sure, I\'d be happy to help you understand the differences between Django and React.js: ### Django:###  Let\'s start with Django which is a well know python library for rapid development and deployment of web servers:-#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Type: -* -| Django is a high-level Python web framework that encourages rapid development and clean , pragmatic design. -| -*Backend: -* -| Django is primarily used for server-side development. It follows the Model-View-Template (MVT) architecture pattern. -| -*Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -* -*Features: -* -| Django provides a built-in ORM (Object-Relational Mapping) system, admin panel, authentication, and security features out of the box. -| -*Scalability: -* -| Django is known for its scalability and is suitable for building complex, data-driven websites. -| -# You can find the documentation -# <a href="https://chatgpt.com">here</a>  ### React.js: ### -*Type: -* -| React.js is a JavaScript library for building user interfaces, specifically for single-page applications. -|  -*Frontend:-* -| React.js is used for client-side development. It follows the component-based architecture. You can learn more <a href="https://chatgpt.com">here</a>. -| -*Features:-* -| React.js allows for the creation of reusable UI components, making the development process more efficient and modular. -|  -* You can find the documentation <a href="https://chatgpt.com">here</a>.-* I hope this was helpful in getting you know the difference between Django and react, please feel free to ask anything related to this. Otherwise you can visit <a href="https://chatgpt.com">this site</a> for more info  ',
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            },
            {
                text: "text1",
                responses: [
                    'Sure, I\'d be happy to help you understand the differences between Django and React.js: ### Django:###  Let\'s start with Django which is a well know python library for rapid development and deployment of web servers:-#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Type: -* -| Django is a high-level Python web framework that encourages rapid development and clean , pragmatic design. -| -*Backend: -* -| Django is primarily used for server-side development. It follows the Model-View-Template (MVT) architecture pattern. -| -#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Features: -* -| Django provides a built-in ORM (Object-Relational Mapping) system, admin panel, authentication, and security features out of the box. -| -*Scalability: -* -| Django is known for its scalability and is suitable for building complex, data-driven websites. -| -# You can find the documentation -# <a href="https://chatgpt.com">here</a>  ### React.js: ### -*Type: -* -| React.js is a JavaScript library for building user interfaces, specifically for single-page applications. -|  -*Frontend:-* -| React.js is used for client-side development. It follows the component-based architecture. You can learn more <a href="https://chatgpt.com">here</a>. -| -*Features:-* -| React.js allows for the creation of reusable UI components, making the development process more efficient and modular. -|  -* You can find the documentation <a href="https://chatgpt.com">here</a>.-* I hope this was helpful in getting you know the difference between Django and react, please feel free to ask anything related to this. Otherwise you can visit <a href="https://chatgpt.com">this site</a> for more info  ',
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            }
        ]
    },
    {
        message: [
            {
                text: "Sample message 1",
                responses: [
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>',
                ]
            }
        ]
    },
    {
        message: [
            {
                text: "hello",
                responses: [
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            },
            {
                text: "hello3",
                responses: ["Hello there!3", "Hello how can I assist you3"]
            }
        ]
    },
    {
        message: [
            {
                text: "text",
                responses: [
                    'Sure, I\'d be happy to help you understand the differences between Django and React.js: ### Django:###  Let\'s start with Django which is a well know python library for rapid development and deployment of web servers:-#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Type: -* -| Django is a high-level Python web framework that encourages rapid development and clean , pragmatic design. -| -*Backend: -* -| Django is primarily used for server-side development. It follows the Model-View-Template (MVT) architecture pattern. -| -*Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -* -*Features: -* -| Django provides a built-in ORM (Object-Relational Mapping) system, admin panel, authentication, and security features out of the box. -| -*Scalability: -* -| Django is known for its scalability and is suitable for building complex, data-driven websites. -| -# You can find the documentation -# <a href="https://chatgpt.com">here</a>  ### React.js: ### -*Type: -* -| React.js is a JavaScript library for building user interfaces, specifically for single-page applications. -|  -*Frontend:-* -| React.js is used for client-side development. It follows the component-based architecture. You can learn more <a href="https://chatgpt.com">here</a>. -| -*Features:-* -| React.js allows for the creation of reusable UI components, making the development process more efficient and modular. -|  -* You can find the documentation <a href="https://chatgpt.com">here</a>.-* I hope this was helpful in getting you know the difference between Django and react, please feel free to ask anything related to this. Otherwise you can visit <a href="https://chatgpt.com">this site</a> for more info  ',
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            },
            {
                text: "text1",
                responses: [
                    'Sure, I\'d be happy to help you understand the differences between Django and React.js: ### Django:###  Let\'s start with Django which is a well know python library for rapid development and deployment of web servers:-#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Type: -* -| Django is a high-level Python web framework that encourages rapid development and clean , pragmatic design. -| -*Backend: -* -| Django is primarily used for server-side development. It follows the Model-View-Template (MVT) architecture pattern. -| -#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Features: -* -| Django provides a built-in ORM (Object-Relational Mapping) system, admin panel, authentication, and security features out of the box. -| -*Scalability: -* -| Django is known for its scalability and is suitable for building complex, data-driven websites. -| -# You can find the documentation -# <a href="https://chatgpt.com">here</a>  ### React.js: ### -*Type: -* -| React.js is a JavaScript library for building user interfaces, specifically for single-page applications. -|  -*Frontend:-* -| React.js is used for client-side development. It follows the component-based architecture. You can learn more <a href="https://chatgpt.com">here</a>. -| -*Features:-* -| React.js allows for the creation of reusable UI components, making the development process more efficient and modular. -|  -* You can find the documentation <a href="https://chatgpt.com">here</a>.-* I hope this was helpful in getting you know the difference between Django and react, please feel free to ask anything related to this. Otherwise you can visit <a href="https://chatgpt.com">this site</a> for more info  ',
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            }
        ]
    },
    {
        message: [
            {
                text: "Sample message 1",
                responses: [
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>',
                ]
            }
        ]
    },
    {
        message: [
            {
                text: "hello",
                responses: [
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            },
            {
                text: "hello3",
                responses: ["Hello there!3", "Hello how can I assist you3"]
            }
        ]
    },
    {
        message: [
            {
                text: "text",
                responses: [
                    'Sure, I\'d be happy to help you understand the differences between Django and React.js: ### Django:###  Let\'s start with Django which is a well know python library for rapid development and deployment of web servers:-#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Type: -* -| Django is a high-level Python web framework that encourages rapid development and clean , pragmatic design. -| -*Backend: -* -| Django is primarily used for server-side development. It follows the Model-View-Template (MVT) architecture pattern. -| -*Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -* -*Features: -* -| Django provides a built-in ORM (Object-Relational Mapping) system, admin panel, authentication, and security features out of the box. -| -*Scalability: -* -| Django is known for its scalability and is suitable for building complex, data-driven websites. -| -# You can find the documentation -# <a href="https://chatgpt.com">here</a>  ### React.js: ### -*Type: -* -| React.js is a JavaScript library for building user interfaces, specifically for single-page applications. -|  -*Frontend:-* -| React.js is used for client-side development. It follows the component-based architecture. You can learn more <a href="https://chatgpt.com">here</a>. -| -*Features:-* -| React.js allows for the creation of reusable UI components, making the development process more efficient and modular. -|  -* You can find the documentation <a href="https://chatgpt.com">here</a>.-* I hope this was helpful in getting you know the difference between Django and react, please feel free to ask anything related to this. Otherwise you can visit <a href="https://chatgpt.com">this site</a> for more info  ',
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            },
            {
                text: "text1",
                responses: [
                    'Sure, I\'d be happy to help you understand the differences between Django and React.js: ### Django:###  Let\'s start with Django which is a well know python library for rapid development and deployment of web servers:-#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Type: -* -| Django is a high-level Python web framework that encourages rapid development and clean , pragmatic design. -| -*Backend: -* -| Django is primarily used for server-side development. It follows the Model-View-Template (MVT) architecture pattern. -| -#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Features: -* -| Django provides a built-in ORM (Object-Relational Mapping) system, admin panel, authentication, and security features out of the box. -| -*Scalability: -* -| Django is known for its scalability and is suitable for building complex, data-driven websites. -| -# You can find the documentation -# <a href="https://chatgpt.com">here</a>  ### React.js: ### -*Type: -* -| React.js is a JavaScript library for building user interfaces, specifically for single-page applications. -|  -*Frontend:-* -| React.js is used for client-side development. It follows the component-based architecture. You can learn more <a href="https://chatgpt.com">here</a>. -| -*Features:-* -| React.js allows for the creation of reusable UI components, making the development process more efficient and modular. -|  -* You can find the documentation <a href="https://chatgpt.com">here</a>.-* I hope this was helpful in getting you know the difference between Django and react, please feel free to ask anything related to this. Otherwise you can visit <a href="https://chatgpt.com">this site</a> for more info  ',
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            }
        ]
    },
    {
        message: [
            {
                text: "Sample message 1",
                responses: [
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>',
                ]
            }
        ]
    },
    {
        message: [
            {
                text: "hello",
                responses: [
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            },
            {
                text: "hello3",
                responses: ["Hello there!3", "Hello how can I assist you3"]
            }
        ]
    },
    {
        message: [
            {
                text: "text",
                responses: [
                    'Sure, I\'d be happy to help you understand the differences between Django and React.js: ### Django:###  Let\'s start with Django which is a well know python library for rapid development and deployment of web servers:-#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Type: -* -| Django is a high-level Python web framework that encourages rapid development and clean , pragmatic design. -| -*Backend: -* -| Django is primarily used for server-side development. It follows the Model-View-Template (MVT) architecture pattern. -| -*Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -* -*Features: -* -| Django provides a built-in ORM (Object-Relational Mapping) system, admin panel, authentication, and security features out of the box. -| -*Scalability: -* -| Django is known for its scalability and is suitable for building complex, data-driven websites. -| -# You can find the documentation -# <a href="https://chatgpt.com">here</a>  ### React.js: ### -*Type: -* -| React.js is a JavaScript library for building user interfaces, specifically for single-page applications. -|  -*Frontend:-* -| React.js is used for client-side development. It follows the component-based architecture. You can learn more <a href="https://chatgpt.com">here</a>. -| -*Features:-* -| React.js allows for the creation of reusable UI components, making the development process more efficient and modular. -|  -* You can find the documentation <a href="https://chatgpt.com">here</a>.-* I hope this was helpful in getting you know the difference between Django and react, please feel free to ask anything related to this. Otherwise you can visit <a href="https://chatgpt.com">this site</a> for more info  ',
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            },
            {
                text: "text1",
                responses: [
                    'Sure, I\'d be happy to help you understand the differences between Django and React.js: ### Django:###  Let\'s start with Django which is a well know python library for rapid development and deployment of web servers:-#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Type: -* -| Django is a high-level Python web framework that encourages rapid development and clean , pragmatic design. -| -*Backend: -* -| Django is primarily used for server-side development. It follows the Model-View-Template (MVT) architecture pattern. -| -#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Features: -* -| Django provides a built-in ORM (Object-Relational Mapping) system, admin panel, authentication, and security features out of the box. -| -*Scalability: -* -| Django is known for its scalability and is suitable for building complex, data-driven websites. -| -# You can find the documentation -# <a href="https://chatgpt.com">here</a>  ### React.js: ### -*Type: -* -| React.js is a JavaScript library for building user interfaces, specifically for single-page applications. -|  -*Frontend:-* -| React.js is used for client-side development. It follows the component-based architecture. You can learn more <a href="https://chatgpt.com">here</a>. -| -*Features:-* -| React.js allows for the creation of reusable UI components, making the development process more efficient and modular. -|  -* You can find the documentation <a href="https://chatgpt.com">here</a>.-* I hope this was helpful in getting you know the difference between Django and react, please feel free to ask anything related to this. Otherwise you can visit <a href="https://chatgpt.com">this site</a> for more info  ',
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            }
        ]
    },
    {
        message: [
            {
                text: "Sample message 1",
                responses: [
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>',
                ]
            }
        ]
    },
    {
        message: [
            {
                text: "hello",
                responses: [
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            },
            {
                text: "hello3",
                responses: ["Hello there!3", "Hello how can I assist you3"]
            }
        ]
    },
    {
        message: [
            {
                text: "text",
                responses: [
                    'Sure, I\'d be happy to help you understand the differences between Django and React.js: ### Django:###  Let\'s start with Django which is a well know python library for rapid development and deployment of web servers:-#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Type: -* -| Django is a high-level Python web framework that encourages rapid development and clean , pragmatic design. -| -*Backend: -* -| Django is primarily used for server-side development. It follows the Model-View-Template (MVT) architecture pattern. -| -*Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -* -*Features: -* -| Django provides a built-in ORM (Object-Relational Mapping) system, admin panel, authentication, and security features out of the box. -| -*Scalability: -* -| Django is known for its scalability and is suitable for building complex, data-driven websites. -| -# You can find the documentation -# <a href="https://chatgpt.com">here</a>  ### React.js: ### -*Type: -* -| React.js is a JavaScript library for building user interfaces, specifically for single-page applications. -|  -*Frontend:-* -| React.js is used for client-side development. It follows the component-based architecture. You can learn more <a href="https://chatgpt.com">here</a>. -| -*Features:-* -| React.js allows for the creation of reusable UI components, making the development process more efficient and modular. -|  -* You can find the documentation <a href="https://chatgpt.com">here</a>.-* I hope this was helpful in getting you know the difference between Django and react, please feel free to ask anything related to this. Otherwise you can visit <a href="https://chatgpt.com">this site</a> for more info  ',
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            },
            {
                text: "text1",
                responses: [
                    'Sure, I\'d be happy to help you understand the differences between Django and React.js: ### Django:###  Let\'s start with Django which is a well know python library for rapid development and deployment of web servers:-#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Type: -* -| Django is a high-level Python web framework that encourages rapid development and clean , pragmatic design. -| -*Backend: -* -| Django is primarily used for server-side development. It follows the Model-View-Template (MVT) architecture pattern. -| -#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Features: -* -| Django provides a built-in ORM (Object-Relational Mapping) system, admin panel, authentication, and security features out of the box. -| -*Scalability: -* -| Django is known for its scalability and is suitable for building complex, data-driven websites. -| -# You can find the documentation -# <a href="https://chatgpt.com">here</a>  ### React.js: ### -*Type: -* -| React.js is a JavaScript library for building user interfaces, specifically for single-page applications. -|  -*Frontend:-* -| React.js is used for client-side development. It follows the component-based architecture. You can learn more <a href="https://chatgpt.com">here</a>. -| -*Features:-* -| React.js allows for the creation of reusable UI components, making the development process more efficient and modular. -|  -* You can find the documentation <a href="https://chatgpt.com">here</a>.-* I hope this was helpful in getting you know the difference between Django and react, please feel free to ask anything related to this. Otherwise you can visit <a href="https://chatgpt.com">this site</a> for more info  ',
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            }
        ]
    },
    {
        message: [
            {
                text: "Sample message 1",
                responses: [
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>',
                ]
            }
        ]
    },
    {
        message: [
            {
                text: "hello",
                responses: [
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            },
            {
                text: "hello3",
                responses: ["Hello there!3", "Hello how can I assist you3"]
            }
        ]
    },
    {
        message: [
            {
                text: "text",
                responses: [
                    'Sure, I\'d be happy to help you understand the differences between Django and React.js: ### Django:###  Let\'s start with Django which is a well know python library for rapid development and deployment of web servers:-#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Type: -* -| Django is a high-level Python web framework that encourages rapid development and clean , pragmatic design. -| -*Backend: -* -| Django is primarily used for server-side development. It follows the Model-View-Template (MVT) architecture pattern. -| -*Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -* -*Features: -* -| Django provides a built-in ORM (Object-Relational Mapping) system, admin panel, authentication, and security features out of the box. -| -*Scalability: -* -| Django is known for its scalability and is suitable for building complex, data-driven websites. -| -# You can find the documentation -# <a href="https://chatgpt.com">here</a>  ### React.js: ### -*Type: -* -| React.js is a JavaScript library for building user interfaces, specifically for single-page applications. -|  -*Frontend:-* -| React.js is used for client-side development. It follows the component-based architecture. You can learn more <a href="https://chatgpt.com">here</a>. -| -*Features:-* -| React.js allows for the creation of reusable UI components, making the development process more efficient and modular. -|  -* You can find the documentation <a href="https://chatgpt.com">here</a>.-* I hope this was helpful in getting you know the difference between Django and react, please feel free to ask anything related to this. Otherwise you can visit <a href="https://chatgpt.com">this site</a> for more info  ',
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            },
            {
                text: "text1",
                responses: [
                    'Sure, I\'d be happy to help you understand the differences between Django and React.js: ### Django:###  Let\'s start with Django which is a well know python library for rapid development and deployment of web servers:-#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Type: -* -| Django is a high-level Python web framework that encourages rapid development and clean , pragmatic design. -| -*Backend: -* -| Django is primarily used for server-side development. It follows the Model-View-Template (MVT) architecture pattern. -| -#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Features: -* -| Django provides a built-in ORM (Object-Relational Mapping) system, admin panel, authentication, and security features out of the box. -| -*Scalability: -* -| Django is known for its scalability and is suitable for building complex, data-driven websites. -| -# You can find the documentation -# <a href="https://chatgpt.com">here</a>  ### React.js: ### -*Type: -* -| React.js is a JavaScript library for building user interfaces, specifically for single-page applications. -|  -*Frontend:-* -| React.js is used for client-side development. It follows the component-based architecture. You can learn more <a href="https://chatgpt.com">here</a>. -| -*Features:-* -| React.js allows for the creation of reusable UI components, making the development process more efficient and modular. -|  -* You can find the documentation <a href="https://chatgpt.com">here</a>.-* I hope this was helpful in getting you know the difference between Django and react, please feel free to ask anything related to this. Otherwise you can visit <a href="https://chatgpt.com">this site</a> for more info  ',
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            }
        ]
    },
    {
        message: [
            {
                text: "Sample message 1",
                responses: [
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>',
                ]
            }
        ]
    },
    {
        message: [
            {
                text: "hello",
                responses: [
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            },
            {
                text: "hello3",
                responses: ["Hello there!3", "Hello how can I assist you3"]
            }
        ]
    },
    {
        message: [
            {
                text: "text",
                responses: [
                    'Sure, I\'d be happy to help you understand the differences between Django and React.js: ### Django:###  Let\'s start with Django which is a well know python library for rapid development and deployment of web servers:-#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Type: -* -| Django is a high-level Python web framework that encourages rapid development and clean , pragmatic design. -| -*Backend: -* -| Django is primarily used for server-side development. It follows the Model-View-Template (MVT) architecture pattern. -| -*Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -* -*Features: -* -| Django provides a built-in ORM (Object-Relational Mapping) system, admin panel, authentication, and security features out of the box. -| -*Scalability: -* -| Django is known for its scalability and is suitable for building complex, data-driven websites. -| -# You can find the documentation -# <a href="https://chatgpt.com">here</a>  ### React.js: ### -*Type: -* -| React.js is a JavaScript library for building user interfaces, specifically for single-page applications. -|  -*Frontend:-* -| React.js is used for client-side development. It follows the component-based architecture. You can learn more <a href="https://chatgpt.com">here</a>. -| -*Features:-* -| React.js allows for the creation of reusable UI components, making the development process more efficient and modular. -|  -* You can find the documentation <a href="https://chatgpt.com">here</a>.-* I hope this was helpful in getting you know the difference between Django and react, please feel free to ask anything related to this. Otherwise you can visit <a href="https://chatgpt.com">this site</a> for more info  ',
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            },
            {
                text: "text1",
                responses: [
                    'Sure, I\'d be happy to help you understand the differences between Django and React.js: ### Django:###  Let\'s start with Django which is a well know python library for rapid development and deployment of web servers:-#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Type: -* -| Django is a high-level Python web framework that encourages rapid development and clean , pragmatic design. -| -*Backend: -* -| Django is primarily used for server-side development. It follows the Model-View-Template (MVT) architecture pattern. -| -#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Features: -* -| Django provides a built-in ORM (Object-Relational Mapping) system, admin panel, authentication, and security features out of the box. -| -*Scalability: -* -| Django is known for its scalability and is suitable for building complex, data-driven websites. -| -# You can find the documentation -# <a href="https://chatgpt.com">here</a>  ### React.js: ### -*Type: -* -| React.js is a JavaScript library for building user interfaces, specifically for single-page applications. -|  -*Frontend:-* -| React.js is used for client-side development. It follows the component-based architecture. You can learn more <a href="https://chatgpt.com">here</a>. -| -*Features:-* -| React.js allows for the creation of reusable UI components, making the development process more efficient and modular. -|  -* You can find the documentation <a href="https://chatgpt.com">here</a>.-* I hope this was helpful in getting you know the difference between Django and react, please feel free to ask anything related to this. Otherwise you can visit <a href="https://chatgpt.com">this site</a> for more info  ',
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            }
        ]
    },
    {
        message: [
            {
                text: "Sample message 1",
                responses: [
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>',
                ]
            }
        ]
    },
    {
        message: [
            {
                text: "hello",
                responses: [
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            },
            {
                text: "hello3",
                responses: ["Hello there!3", "Hello how can I assist you3"]
            }
        ]
    },
    {
        message: [
            {
                text: "text",
                responses: [
                    'Sure, I\'d be happy to help you understand the differences between Django and React.js: ### Django:###  Let\'s start with Django which is a well know python library for rapid development and deployment of web servers:-#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Type: -* -| Django is a high-level Python web framework that encourages rapid development and clean , pragmatic design. -| -*Backend: -* -| Django is primarily used for server-side development. It follows the Model-View-Template (MVT) architecture pattern. -| -*Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -* -*Features: -* -| Django provides a built-in ORM (Object-Relational Mapping) system, admin panel, authentication, and security features out of the box. -| -*Scalability: -* -| Django is known for its scalability and is suitable for building complex, data-driven websites. -| -# You can find the documentation -# <a href="https://chatgpt.com">here</a>  ### React.js: ### -*Type: -* -| React.js is a JavaScript library for building user interfaces, specifically for single-page applications. -|  -*Frontend:-* -| React.js is used for client-side development. It follows the component-based architecture. You can learn more <a href="https://chatgpt.com">here</a>. -| -*Features:-* -| React.js allows for the creation of reusable UI components, making the development process more efficient and modular. -|  -* You can find the documentation <a href="https://chatgpt.com">here</a>.-* I hope this was helpful in getting you know the difference between Django and react, please feel free to ask anything related to this. Otherwise you can visit <a href="https://chatgpt.com">this site</a> for more info  ',
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            },
            {
                text: "text1",
                responses: [
                    'Sure, I\'d be happy to help you understand the differences between Django and React.js: ### Django:###  Let\'s start with Django which is a well know python library for rapid development and deployment of web servers:-#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Type: -* -| Django is a high-level Python web framework that encourages rapid development and clean , pragmatic design. -| -*Backend: -* -| Django is primarily used for server-side development. It follows the Model-View-Template (MVT) architecture pattern. -| -#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Features: -* -| Django provides a built-in ORM (Object-Relational Mapping) system, admin panel, authentication, and security features out of the box. -| -*Scalability: -* -| Django is known for its scalability and is suitable for building complex, data-driven websites. -| -# You can find the documentation -# <a href="https://chatgpt.com">here</a>  ### React.js: ### -*Type: -* -| React.js is a JavaScript library for building user interfaces, specifically for single-page applications. -|  -*Frontend:-* -| React.js is used for client-side development. It follows the component-based architecture. You can learn more <a href="https://chatgpt.com">here</a>. -| -*Features:-* -| React.js allows for the creation of reusable UI components, making the development process more efficient and modular. -|  -* You can find the documentation <a href="https://chatgpt.com">here</a>.-* I hope this was helpful in getting you know the difference between Django and react, please feel free to ask anything related to this. Otherwise you can visit <a href="https://chatgpt.com">this site</a> for more info  ',
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            }
        ]
    },
    {
        message: [
            {
                text: "Sample message 1",
                responses: [
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>',
                ]
            }
        ]
    },
    {
        message: [
            {
                text: "hello",
                responses: [
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            },
            {
                text: "hello3",
                responses: ["Hello there!3", "Hello how can I assist you3"]
            }
        ]
    },
    {
        message: [
            {
                text: "text",
                responses: [
                    'Sure, I\'d be happy to help you understand the differences between Django and React.js: ### Django:###  Let\'s start with Django which is a well know python library for rapid development and deployment of web servers:-#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Type: -* -| Django is a high-level Python web framework that encourages rapid development and clean , pragmatic design. -| -*Backend: -* -| Django is primarily used for server-side development. It follows the Model-View-Template (MVT) architecture pattern. -| -*Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -* -*Features: -* -| Django provides a built-in ORM (Object-Relational Mapping) system, admin panel, authentication, and security features out of the box. -| -*Scalability: -* -| Django is known for its scalability and is suitable for building complex, data-driven websites. -| -# You can find the documentation -# <a href="https://chatgpt.com">here</a>  ### React.js: ### -*Type: -* -| React.js is a JavaScript library for building user interfaces, specifically for single-page applications. -|  -*Frontend:-* -| React.js is used for client-side development. It follows the component-based architecture. You can learn more <a href="https://chatgpt.com">here</a>. -| -*Features:-* -| React.js allows for the creation of reusable UI components, making the development process more efficient and modular. -|  -* You can find the documentation <a href="https://chatgpt.com">here</a>.-* I hope this was helpful in getting you know the difference between Django and react, please feel free to ask anything related to this. Otherwise you can visit <a href="https://chatgpt.com">this site</a> for more info  ',
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            },
            {
                text: "text1",
                responses: [
                    'Sure, I\'d be happy to help you understand the differences between Django and React.js: ### Django:###  Let\'s start with Django which is a well know python library for rapid development and deployment of web servers:-#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Type: -* -| Django is a high-level Python web framework that encourages rapid development and clean , pragmatic design. -| -*Backend: -* -| Django is primarily used for server-side development. It follows the Model-View-Template (MVT) architecture pattern. -| -#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Features: -* -| Django provides a built-in ORM (Object-Relational Mapping) system, admin panel, authentication, and security features out of the box. -| -*Scalability: -* -| Django is known for its scalability and is suitable for building complex, data-driven websites. -| -# You can find the documentation -# <a href="https://chatgpt.com">here</a>  ### React.js: ### -*Type: -* -| React.js is a JavaScript library for building user interfaces, specifically for single-page applications. -|  -*Frontend:-* -| React.js is used for client-side development. It follows the component-based architecture. You can learn more <a href="https://chatgpt.com">here</a>. -| -*Features:-* -| React.js allows for the creation of reusable UI components, making the development process more efficient and modular. -|  -* You can find the documentation <a href="https://chatgpt.com">here</a>.-* I hope this was helpful in getting you know the difference between Django and react, please feel free to ask anything related to this. Otherwise you can visit <a href="https://chatgpt.com">this site</a> for more info  ',
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            }
        ]
    },
    {
        message: [
            {
                text: "Sample message 1",
                responses: [
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>',
                ]
            }
        ]
    },
    {
        message: [
            {
                text: "hello",
                responses: [
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>'
                ]
            },
            {
                text: "hello3",
                responses: [
                    '-# You can find <a href="https://chatgpt.com">this site</a> the documentation  <a href="https://chatgpt.com">here</a> link <a href="https://chatgpt.com">this site</a>-#  ',
                ]
            }
        ]
    },
];

let messages;

//modalOverlay.addEventListener("click", closeModal);

document.addEventListener("DOMContentLoaded", function () {
    //document.body.classList.add("light-mode");
    toggleTheme();
    getCurrentTime();
    userName.textContent = "Mutai Hillary.";
    getInitials();
    htSw.click();
    sendSvg.classList.add("disabled");
    //document.body.classList.toggle("light-mode", themeColor === "light_mode");

    // defaultText.classList.add(
    //     state ? "gradient-text-animation" : "none"
    // );
    addSuggestions(list);
    statusP.classList.add(state ? "gradient-text-animation" : "none");
    defaultText.classList.add(
        state ? "gradient-text-animation" : "default-text"
    );
    statusP.textContent = state
        ? /*"Online"*/ `${new Date().toLocaleTimeString()}`
        : "Offline";
    killSw.checked = state ? false : true;
    if (!state) {
        console.log(state);
        //sendMessageBtn.disabled = !state;
        toggleButtonState(state);
    }
    // if (messages.length > 0) {
    //     defaultText.style.display = "none";
    //     // addSampleMessages(messages);
    //     generating = false;
    // } else {
    //     addMessage("MksU-VA", defaultResponse, false);
    // }
    fetch('/api/user_messages/')
    .then(response => response.json())
    .then(data => {
        messages = data.messages//.flatMap(item => item.message);
        console.log(messages)
        if (messages.length > 0) {
            addSampleMessages(messages)
        }
        })
        .catch(error => console.error('Error fetching messages:', error));

    initialsSpan.addEventListener("click", closeModal);
    newChat.addEventListener("click", new_chat);
    clearConvo.addEventListener("click", clearConversation);
    scrollButton1.addEventListener("click", () => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });
    // Event listener for scroll events on the messages container
    messagesContainer.addEventListener("scroll", function () {
        // Check if the user has scrolled up
        if (
            messagesContainer.scrollTop + messagesContainer.clientHeight + 20 <
            messagesContainer.scrollHeight ||
            !generating
        ) {
            // console.log('scrollTop');
            autoScroll = false;
        } else {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            // console.log('Scroll down');
            autoScroll = true;
        }
    });
    document.addEventListener("visibilitychange", function () {
        console.log(document.hidden);
    });
    messageInput.addEventListener("input", () => {
        if (messageInput.value.trim().length < 2) {
            sendMessageBtn.disabled = true;
            sendSvg.classList.add("disabled");
        } else {
            if (!killSw.checked) {
                sendMessageBtn.disabled = false;
                sendSvg.classList.remove("disabled");
            }
        }
    });
    // Prevent click events inside the modal from propagating to the overlay
    modal.addEventListener("click", event => {
        event.stopPropagation();
    });
    // JavaScript to toggle the dropdown menu
    document.querySelector(".dots").addEventListener("click", function () {
        var dropdown = document.querySelector(".dropdown-content");
        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
        } else {
            dropdown.style.display = "block";
            dropdown.querySelector(".close1").addEventListener("click", () => {
                dropdown.style.display = "none";
            });
        }
    });

    sol.addEventListener("click", () => {
        messagesContainer.innerHTML = `
                    <span class='voiceContainer'>
                    <div class="bars">
                    <div class="bar" style="animation-delay: 0.2s;"></div>
                    <div class="bar" style="animation-delay: 0.4s;"></div>
                    <div class="bar" style="animation-delay: 0.6s;"></div>
                    <div class="bar" style="animation-delay: 0.89s;"></div>
                    </div>
                    <div class="stop-speaking">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                    class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </div>
                    </span>
                            `;
        sol.style.display = "none";
        mute.style.display = "block";
        isSpeaking = true;
        const stopSpeakingBtn = messagesContainer.querySelector(".stop-speaking");
        stopSpeakingBtn.addEventListener("click", () => {
            mute.click();
            setTimeout(() => {
                messagesContainer.innerHTML = "";
                addSampleMessages(messages);
                isSpeaking = false;
            }, 500);
        });
        /*setTimeout(() => {
            isSpeaking = false;
            if (!isSpeaking){
                const bars = messagesContainer.querySelectorAll('.bar');
                bars.forEach((bar) => {
                    bar.style.animation = 'none';
                })
            }
        }, 200000)*/
    });

    mute.addEventListener("click", () => {
        const bars = messagesContainer.querySelectorAll(".bar");
        sol.style.display = "block";
        mute.style.display = "none";
        //window.speechSynthesis.pause();
        bars.forEach(bar => {
            bar.style.animation = "none";
        });
    });

    // Show the scroll button when the user scrolls up
    messagesContainer.addEventListener("scroll", function () {
        if (
            messagesContainer.scrollTop <
            messagesContainer.scrollHeight - messagesContainer.clientHeight - 500
        ) {
            scrollButton.className = "scroll-button";
            scrollButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
    class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
  </svg>
                `;
            /*<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
            </svg>*/

            messagesContainer.insertAdjacentElement("beforeend", scrollButton);
            scrollButton.style.display = "block";
        } else {
            scrollButton.style.display = "none";
        }
    });
    // Scroll to the bottom when the scroll button is clicked
    scrollButton.addEventListener("click", function () {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        scrollButton.style.display = "none";
    });

    showSug.onchange = function (e) {
        suggestionClass.classList.toggle("hidden"); // = "none";
        //suggestionClass.style.display = "none";
        const kk = document.querySelector("#kk");
        //daySvg.style.display = daySvg.style.display === "none" ? "inline" : "none";

        //kk.classList.toggle("hidden"); //kk.style.display = "block" ? "none": "block";
        kk.textContent = suggestionClass.classList.contains('hidden') ? kk.innerHTML = '' : kk.innerHTML = 'Suggested prompts:';
    };

    htSw.onchange = function (e) {
        //chat.style.height = "99dvh";
        //messagesContainer.style.height = "75vh";
        chat.classList.toggle("fullSreen");
        messagesContainer.classList.toggle("fullSreen1");
    };

    killSw.onchange = function (e) {
        // let m = true
        state = state ? false : true;
        //statusP.textContent = state ? "Online" : "Offline";
        statusP.textContent = state
            ? /*"Online"*/ `${new Date().toLocaleTimeString()}`
            : "Offline";
        //myName.classList.add(!myName.classList.contains("gradient-text-animation") ? "gradient-text-animation" : "none");
        //myName.classList.toggle("gradient-text-animation");
        defaultText.classList.toggle("gradient-text-animation");
        //!sendSvg.classList.contains("disabled")
        //    ? sendSvg.setAttribute("fill", "grey")
        //    : sendSvg.setAttribute("fill", "var(--text-color)");
        //sendSvg.classList.toggle("disabled");
        console.log(state);
        // m = state ? true : false
        showSug.checked ? kk.innerHTML = "" : kk.textContent = 'Suggested prompts:';
        sendMessageBtn.disabled = (state) ? false : true;
        (sendMessageBtn.disabled || messageInput.value == '') ? sendSvg.classList.add('disabled') : sendSvg.classList.remove("disabled")
    };

    themeSw.onchange = function (e) {
        document.body.classList.toggle("light-mode");
        localStorage.setItem("themeColor", themeButton.innerText);
        toggleTheme();
    };
    themeButton.addEventListener("click", () => {
        // Toggle body's class for the theme mode and save the updated theme to the local storage
        document.body.classList.toggle("light-mode");
        localStorage.setItem("themeColor", themeButton.innerText);
        //themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";
        toggleTheme();
    });

    messageInput.addEventListener("keydown", e => {
        if (state) {
            if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
                e.preventDefault();
                userText = messageInput.value;
                sendMessageBtn.click();
            }
        } else {
            //kk.style.color = "#ee5855";
            kk.innerText = "Assistant disabled by user settings!";
        }
    });

    sendMessageBtn.addEventListener("click", () => {
        if (!state) {
            kk.style.color = "#ee5855";
            kk.innerText = "Assistant disabled by user settings!";
            setTimeout(() => {
                kk.style.color = "var(--text-color)";
                showSug.checked ? kk.innerHTML = "" : kk.textContent = 'Suggested prompts:';
            }, 1000);
        } else {
            userText = messageInput.value;
            sendMessage();
        }
    });
    
});

/*
// Optional: Close the dropdown if clicked outside
window.onclick = function(event) {
if (!event.target.matches('.dots')) {
var dropdowns = document.querySelectorAll('.dropdown-content');
dropdowns.forEach(function(dropdown) {
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    }
});
}
};
*/
function closeModal() {
    modal.style.display = modal.style.display === "block" ? "none" : "block";
    modalOverlay.style.display =
        modalOverlay.style.display === "flex" ? "none" : "flex";
    if (modal.style.display == "block") {
        modalOverlay.addEventListener("click", function (e) {
            if (this.className === "modal-overlay") {
                closeModal();
            }
        });
    }
}


function toggleButtonState(state) {
    !state
        ? sendSvg.setAttribute("fill", "grey")
        : sendSvg.setAttribute("fill", "var(--text-color)");

    sendSvg.classList.toggle("disabled");
    // Set the button's disabled property based on the checkbox's checked property
    sendMessageBtn.disabled = !killSw.checked;
    //!message.innerText == '' ? message.innerText = '' : message.innerText;
}

function getInitials() {
    const name = document.querySelector("#name").textContent;
    const words = name.split(" ");
    const initials = words
        .slice(0, 2)
        .map(word => word.charAt(0))
        .join("");
    initialsSpan.innerHTML = initials;
}


function toggleTheme() {
    var daySvg = document.getElementById("day-svg");
    var nightSvg = document.getElementById("night-svg");
    if (document.body.classList.contains("light-mode")) {
        daySvg.style.display = "none";
        nightSvg.style.display = "block";
        themeSw.checked = false;
    } else {
        nightSvg.style.display = "none";
        daySvg.style.display = "block";
        themeSw.checked = true;
    }

    //daySvg.style.display = daySvg.style.display === "none" ? "inline" : "none";

    //nightSvg.style.display =
    nightSvg.style.display === "none" ? "inline" : "none";
}

function addSuggestions(data) {
    suggestionClass.innerHTML = ""; // Clear existing suggestions
    kk.style.color = "var(--text-color)";
    !showSug.checked ? kk.innerText = "Suggested Prompts:" : "";
    //Randomly select 4 suggestions
    const shuffledList = data.sort(() => Math.random() - 0.5);
    const selectedStrings = shuffledList.slice(0, 4);

    selectedStrings.forEach(function (string) {
        var pElement = document.createElement("p");
        pElement.className = "sug";
        pElement.textContent = string;
        pElement.addEventListener("click", event => {
            if (state) {
                userText = event.target.textContent;
                messageInput.value = userText;
                sendMessage(); // Fetch and display new suggestions based on the selected one
            } else {
                kk.style.color = "#ee5855";
                kk.innerText = "Assistant disabled by user settings!";
                setTimeout(() => {
                    kk.style.color = "var(--text-color)";
                    kk.innerText = "Suggested Prompts:";
                }, 2000);
                return;
            }
        });
        suggestionClass.appendChild(pElement);
    });
}

function sendMessage() {
    const messageText = messageInput.value.trim();
    userText = messageText;
    let response = "";
    let fetchedSug = [];
    if (!state) {
        kk.innerText = "Assistant disabled by user settings!";
    } else {
        if (!generating) {
            if (messageText !== "") {
                currentTextIndex = 0;
                let messageObject = {
                    message: [
                        {
                            text: `${messageText}`,
                            responses: []
                        }
                    ]
                };
                if (messagesContainer.querySelector(".error-message")) {
                    messagesContainer.querySelector(".error-message").remove();
                }
                // Add user's message to UI
                if (!isSpeaking) {
                    addNavigableResponse(
                        "You",
                        messageObject.message[currentTextIndex].text,
                        true,
                        messageObject,
                        null,
                        null
                    );
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }

                const prompt = { prompt: messageText };

                simulatedFetch("/getResponse", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(prompt)
                })
                    .then(data => {
                        suggestionClass.innerHTML = "";
                        if (kk.classList.contains("error")) {
                            kk.classList.remove("error");
                        }
                        return data.json();
                    })
                    .then(data => {
                        response = data.response;
                        messageObject.message[0].responses.push(response);
                        messages.push(messageObject);
                        console.log("messageObject", messages);
                        fetchedSug = data.suggestions;
                        suggestionClass.innerHTML = "";
                        addSuggestions(fetchedSug);
                        messageInput.value = "";
                        sendMessageBtn.disabled = true;
                        sendSvg.classList.add('disabled')
                        if (!isSpeaking) {
                            addNavigableResponse(
                                "MKSU-VA",
                                messageObject.message[currentTextIndex].responses,
                                false,
                                messageObject,
                                null,
                                true
                            );
                        } else {
                            const patterns = [
                                { type: "link", regex: /<a href="[^"]+">([^<]+)<\/a>/g }, // Matches HTML anchor tags and captures inner text
                                { type: "header", regex: /###([^#]+)###/g }, // Matches custom header format ###header### and captures inner text
                                { type: "subheader", regex: /\*\*\*([^*]+)\*\*\*/g }, // Matches custom subheader format ***subheader*** and captures inner text
                                { type: "ol", regex: /-#([^#]*)-#/g }, // Matches custom ordered list item format -#item-# and captures inner text
                                { type: "ul", regex: /-\*([^*]*)-\*/g }, // Matches custom unordered list item format -*item-* and captures inner text
                                { type: "reset", regex: /!\|/g }, // Matches custom reset sequence !|
                                { type: "override", regex: /!\d+\|/g }, // Matches custom override sequence !digit|
                                { type: "expl", regex: /-\|([^\|]*)-\|/g } // Matches custom explanation -|text|
                            ];

                            function removePatterns(text) {
                                let cleanedText = text;
                                patterns.forEach(pattern => {
                                    cleanedText = cleanedText.replace(pattern.regex, (_, capturedText) => capturedText ? capturedText : '');
                                });
                                return cleanedText;
                            }
                            convertTextToSpeech(removePatterns(response));

                        }
                    })
                    .catch(error => {
                        // Extract the status from the error response
                        const errorStatus = error.status;

                        // Determine the error message based on status
                        let errorMessage;
                        if (errorStatus === 400) {
                            errorMessage =
                                "Bad Request: Please check your input and try again.";
                        } else if (errorStatus === 401) {
                            errorMessage = "Unauthorized: Please log in and try again.";
                        } else if (errorStatus === 403) {
                            errorMessage =
                                "Forbidden: You do not have permission to access this resource.";
                        } else if (errorStatus === 404) {
                            errorMessage =
                                "Not Found: The requested resource could not be found.";
                        } else if (errorStatus === 500) {
                            errorMessage =
                                "Internal Server Error: An unexpected error occurred. Please try again later.";
                        } else {
                            errorMessage =
                                "An unexpected error occurred. Please try again.";
                        }

                        console.log("Error fetching response!!", error);
                        if (!isSpeaking) {
                            const mt = document.querySelectorAll(".message")
                            const lastMessage = mt[mt.length - 1];
                            lastMessage.remove();
                        }
                        suggestionClass.innerHTML = "";
                        //"An error occurred  while generating response!!  Please check your connection and tap to retry. If this persists please contact the administrator...";
                        kk.innerText = "Error fetching suggestions!!";
                        kk.style.color = "#ee5855";
                        console.log("Error fetching suggestions!!", error);
                        setTimeout(() => {
                            generating = false;
                        }, 500);
                        const errorMessageDiv = document.createElement("div");
                        errorMessageDiv.className = "error-message";
                        errorMessageDiv.innerHTML = `
                                <span>
                                    <p class="error-text"></p>
                                    <button class="retry">Retry</button>
                                </span>
                                `;
                        messagesContainer.insertAdjacentElement(
                            "beforeend",
                            errorMessageDiv
                        );
                        const retryBtn = errorMessageDiv.querySelector(".retry");
                        const errorTxt = errorMessageDiv.querySelector(".error-text");
                        errorTxt.innerText = errorMessage; //"Error:\n An error occurred  while generating response!!  Please check your connection and tap to retry. If this persists please contact the administrator..."
                        retryBtn.addEventListener("click", function (e) {
                            // closeModal()
                            messageInput.value = userText;
                            sendMessage();
                        });
                        messagesContainer.scrollTop = messagesContainer.scrollHeight;
                        sendMessageBtn.disabled = false;
                        sendSvg.classList.remove('disabled')
                        stopLoader();
                    });

                setTimeout(function () {
                    generating = true;
                    animateText = true;
                    //addNavigableResponse("MKSU-VA", messageObject.message[currentTextIndex].responses, false, messageObject, null, true);
                }, 500);
            } else {
                kk.innerText = "Please enter something first...";
                kk.style.color = "#ee5855";
                //messageInput.setAttribute('placeHolder', 'Please enter something first...');
                setTimeout(() => {
                    kk.style.color = "var(--text-color)";
                    kk.innerText = "Suggested Prompts:";
                }, 2000);
                return;
            }
        } else {
            kk.innerText = "Please wait for the current generation to end...";
            kk.style.color = "#ee5855";
            setTimeout(() => {
                kk.style.color = "var(--text-color)";
                kk.innerText = "Suggested Prompts:";
            }, 2000);
            generating = false;
            return;
        }
    }
    if (defaultText) {
        defaultText.style.display = "none";
    }
}

function simulatedFetch(url, options) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // Randomly simulate errors
            const shouldError = Math.random() < 0.5; // 50% chance to simulate an error
            if (shouldError) {
                const errorType = Math.random();
                let errorResponse;

                if (errorType < 0.2) {
                    // Simulate a bad request (400)
                    errorResponse = new Response(
                        JSON.stringify({ error: "Bad Request" }),
                        {
                            status: 400,
                            headers: { "Content-Type": "application/json" }
                        }
                    );
                } else if (errorType < 0.4) {
                    // Simulate an unauthorized error (401)
                    errorResponse = new Response(
                        JSON.stringify({ error: "Unauthorized" }),
                        {
                            status: 401,
                            headers: { "Content-Type": "application/json" }
                        }
                    );
                } else if (errorType < 0.6) {
                    // Simulate a forbidden error (403)
                    errorResponse = new Response(
                        JSON.stringify({ error: "Forbidden" }),
                        {
                            status: 403,
                            headers: { "Content-Type": "application/json" }
                        }
                    );
                } else if (errorType < 0.8) {
                    // Simulate a not found error (404)
                    errorResponse = new Response(
                        JSON.stringify({ error: "Not Found" }),
                        {
                            status: 404,
                            headers: { "Content-Type": "application/json" }
                        }
                    );
                } else {
                    // Simulate an internal server error (500)
                    errorResponse = new Response(
                        JSON.stringify({ error: "Internal Server Error" }),
                        {
                            status: 500,
                            headers: { "Content-Type": "application/json" }
                        }
                    );
                }

                reject(errorResponse);
            } else {
                // Predefined responses
                const predefinedResponses = [
                    /*'###This is h1### ***this is h3*** -* Hello-* -| Hello lets have an explanation: <a href="https://chatgpt.com">here</a> ofcox with a link -| -#Hello there <a href="https://chatgpt.com">here</a> copy. -# This is a plain text... <a href="https://chatgpt.com">here</a> and a lomnk   -# I\'M mutai hillary  <a href="https://chatgpt.com">here</a> a link -# -* Hello best fri-* -#I\'m a kenyan -# <a href="https://chatgpt.com">here</a>  !| -| Hello lets have an explanation: -| -# I\'m a s/w developer-#  -# I thin AI is cool....-#  -* Unoedered link . <a href="https://chatgpt.com">here</a> is here -*',*/
                    'Hello! This is a sample response from ChatGPT. You can visit our website <a href="https://chatgpt.com">here</a>.Then:***Express.js:*** -#Express.js is a minimalist web framework for Node.js. -# It is commonly used for building APIs and web applications with Node.js.  ### Django: ###  -* Type: -* Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.  Visit us at : <a href="https://chatgpt.com">here</a>',
                    'Sure, I\'d be happy to help you understand the differences between Django and React.js: ### Django:###  Let\'s start with Django which is a well know python library for rapid development and deployment of web servers:-#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Type: -* -| Django is a high-level Python web framework that encourages rapid development and clean , pragmatic design. -| -*Backend: -* -| Django is primarily used for server-side development. It follows the Model-View-Template (MVT) architecture pattern. -| -#Follow <a href="https://chatgpt.com">this</a> link or visit   <a href="https://chatgpt.com">this page </a> to learn more. -# -*Features: -* -| Django provides a built-in ORM (Object-Relational Mapping) system, admin panel, authentication, and security features out of the box. -| -*Scalability: -* -| Django is known for its scalability and is suitable for building complex, data-driven websites. -| -# You can find the documentation -# <a href="https://chatgpt.com">here</a>  ### React.js: ### -*Type: -* -| React.js is a JavaScript library for building user interfaces, specifically for single-page applications. -|  -*Frontend:-* -| React.js is used for client-side development. It follows the component-based architecture. You can learn more <a href="https://chatgpt.com">here</a>. -| -*Features:-* -| React.js allows for the creation of reusable UI components, making the development process more efficient and modular. -|  -* You can find the documentation <a href="https://chatgpt.com">here</a>.-* I hope this was helpful in getting you know the difference between Django and react, please feel free to ask anything related to this. Otherwise you can visit <a href="https://chatgpt.com">this site</a> for more info',
                    "Hello there, this is a Text to Speech Converter."
                ];

                // Simulate a successful response
                const randomResponse =
                    predefinedResponses[
                    Math.floor(Math.random() * predefinedResponses.length)
                    ];
                const simulatedResponse = new Response(
                    JSON.stringify({
                        response: randomResponse,
                        suggestions: list
                    }),
                    {
                        status: 200,
                        headers: { "Content-Type": "application/json" }
                    }
                );
                resolve(simulatedResponse);
            }
        }, 1000);
    });
}


function startLoader() {
    const loadingDiv = document.createElement("span");
    loadingDiv.className = "loading";
    loadingDiv.innerHTML = "<span></span>";
    assistDivM.appendChild(loadingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    console.log("loader stated");
    autoScroll = true;
}

function stopLoader(messageDiv) {
    const loadingMessage = document.querySelectorAll(".messages .loading");
    let parent = assistDivM;
    // console.log('YX',messagesContainer.children);
    if (loadingMessage.length > 0) {
        loadingMessage.forEach(function (loader) {
            loader.remove();
        });
        generating = false;
        console.log("loader stopped");
    }
    const panel = document.createElement("span");
    const mt = document.querySelectorAll(".message-text");
    const lastMessage = mt[mt.length - 1];
    const lastTxt = lastMessage.querySelector(".text");
    const lastTt = lastMessage.querySelector(".timestamp");
    const lastAs = lastTt.querySelector(".assist");
    autoScroll = true;
    panel.style.display = "none";
    panel.className = "panel";
    panel.innerHTML = `
            <button title="Speak" class="speak">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
            </svg>
            </button>
            <button title="Copy" class="copy_btn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6"> 
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
            </svg>
            </button>
            <button title="Regenerate" class="regenerate"">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd"
                d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                clip-rule="evenodd" />
            </svg>
            </button>
            <button title="Like" class="like">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
            </svg>
        </button>
            <button title="Dislike" class="dislike">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6"> 
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
            </svg>
        </button>
        
        `;

    // assistDivM.innerHTML = '';
    if (lastTxt.classList.contains("error")) {
        parent.querySelector(".panel").remove();
    } else if (mt.length > 1 && !lastAs.querySelector(".panel")) {
        parent.appendChild(panel);
    }
    // console.log("assist1", (parent.parentElement.parentElement));
    const messageTxt = parent.parentElement.parentElement;
    messageTxt.addEventListener("focus", () => {
        panel.style.display = "flex";
        messageTxt.classList.add("focused");
    });

    // Add event listeners for mouse enter and leave
    messageTxt.addEventListener("mouseenter", () => {
        panel.style.display = "flex";
        messageTxt.classList.add("focused");
    });

    messageTxt.addEventListener("blur", () => {
        setTimeout(() => {
            panel.style.display = "none";
            messageTxt.classList.remove("focused");
        }, 50);
    });

    messageTxt.addEventListener("mouseleave", () => {
        if (!messageTxt.contains(document.activeElement)) {
            panel.style.display = "none";
            messageTxt.classList.remove("focused");
        }
    });
    panel.querySelector(".speak").addEventListener("click", () => {
        var text = messageDiv.querySelector(".text").innerText;
        convertTextToSpeech(text);
    });
    function convertTextToSpeech(text) {
        try {
            console.log("speaking", text);
            // Create a new SpeechSynthesisUtterance object
            var speech = new SpeechSynthesisUtterance();

            // Set the text that will be spoken
            speech.text = text;

            // Set additional properties if needed (optional)
            speech.lang = "en-US"; // Set the language
            speech.volume = 1; // Set the volume (0 to 1)
            speech.rate = 1.2; // Set the rate (0.1 to 10)
            speech.pitch = 1; // Set the pitch (0 to 2)

            // Speak the text
            window.speechSynthesis.speak(speech);
        } catch (error) {
            console.log("An error occurred!!");
        }
    }
    panel.querySelector(".copy_btn").addEventListener("click", () => {
        const clone = messageDiv.cloneNode(true);
        // const textWithLinks = convertLinks(clone);
        const textWithLinks = convertLinks(messageDiv);
        const textToCopy = textWithLinks.querySelector(".text").innerText;
        navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
                console.log("Text copied...:", textToCopy);
            })
            .catch(err => {
                console.error("Failed to copy text: ", err);
            });
    });
    panel.querySelector(".regenerate").addEventListener("click", event => {
        console.log("Regenerating");

        // Find the event source element
        const sourceElement = event.currentTarget.closest(".message");

        // Find the container element of the messages
        const messagesContainer = sourceElement.closest(".messages");

        // Get all .message elements in the container
        const allMessages = Array.from(
            messagesContainer.querySelectorAll(".message")
        );

        // Find the index of the source element in the allMessages array
        const sourceIndex = allMessages.indexOf(sourceElement);

        // Remove the .message-personal element immediately above the source
        let innerTxt = "";
        if (sourceIndex > 0) {
            const personalAboveElement = allMessages[sourceIndex - 1];
            if (personalAboveElement.classList.contains("message-personal")) {
                innerTxt =
                    personalAboveElement.querySelector(".text").innerText;
                personalAboveElement.remove();
            }
        }

        // Remove the source element
        sourceElement.remove();

        // Remove all .message and .message-personal elements after the source element
        for (let i = sourceIndex; i < allMessages.length; i++) {
            allMessages[i].remove();
        }

        messageInput.value = innerTxt;
        sendMessage();
    });

    panel.querySelector(".like").addEventListener("click", () => {
        console.log("Liking");
    });

    panel.querySelector(".dislike").addEventListener("click", () => {
        console.log("disLiking");
    });
}

function convertLinks(copiedHtml) {
    const links = copiedHtml.querySelectorAll("a");
    links.forEach(link => {
        const href = link.getAttribute("href");
        link.textContent = href;
    });
    let f = copiedHtml;
    return f;
}

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const time = hours + ":" + minutes;
    return time;
}

function clearConversation(sourceElement) {
    console.log("Clearing");
}
//New chat implementation
function new_chat() {
    console.log("New Chat");
}

function parseText(text) {
    // Define patterns for different types of elements
    const patterns = [
        { type: "link", regex: /<a href="[^"]+">[^<]+<\/a>/ }, // Matches HTML anchor tags
        { type: "header", regex: /###([^#]+)###/ }, // Matches custom header format ###header###
        { type: "subheader", regex: /\*\*\*([^*]+)\*\*\*/ }, // Matches custom subheader format ***subheader***
        { type: "ol", regex: /-#([^#]*)-#/ }, // Matches custom ordered list item format -#item-#
        { type: "ul", regex: /-\*([^*]*)-\*/ }, // Matches custom unordered list item format -*item-*
        { type: "reset", regex: /!\|/ }, // Matches custom reset sequence £|
        { type: "override", regex: /!\d+\|/ }, // Matches custom override sequence |
        { type: "expl", regex: /-\|([^\|]*)-\|/ } // Matches custom explanation |
    ];

    let elements = []; // Array to hold the parsed elements
    let index = 0; // Current position in the text
    let olIndex = 1; // Current ordered list index

    // Loop through the text until the end
    while (index < text.length) {
        let matched = false;

        // Check each pattern to see if it matches the current position in the text
        for (const { type, regex } of patterns) {
            const match = regex.exec(text.slice(index));
            if (match && match.index === 0) {
                let elementText = match[0];

                // Handle reset sequence
                if (type === "reset") {
                    olIndex = 1; // Reset ordered list index
                    elements.push({ type, match: elementText, index });
                    index += match[0].length; // Move index past the matched element
                    matched = true;
                    break;
                }

                // Handle override sequence
                if (type === "override") {
                    // Extract the new olIndex from the override sequence
                    olIndex = parseInt(elementText.match(/\d+/)[0], 10);
                    elements.push({ type, match: elementText, index });
                    index += match[0].length; // Move index past the matched element
                    matched = true;
                    break;
                }

                // Handling explanation text
                if (type === "expl") {
                    const listType = "expl";
                    const explItems = [];
                    let itemIndex = 0;

                    while (itemIndex < elementText.length) {
                        const linkMatch = /<a href="[^"]+">[^<]+<\/a>/.exec(
                            elementText.slice(itemIndex)
                        );
                        if (linkMatch && linkMatch.index === 0) {
                            explItems.push({
                                type: "link",
                                match: linkMatch[0],
                                index: itemIndex
                            });
                            itemIndex += linkMatch[0].length;
                        } else {
                            const nextLinkIndex = elementText.indexOf(
                                "<a href=",
                                itemIndex
                            );
                            const endIndex =
                                nextLinkIndex !== -1
                                    ? nextLinkIndex
                                    : elementText.length;
                            const plainTextMatch = elementText.slice(
                                itemIndex,
                                endIndex
                            );
                            if (plainTextMatch.trim()) {
                                explItems.push({
                                    type: "plainText",
                                    match: plainTextMatch,
                                    index: itemIndex
                                });
                            }
                            itemIndex = endIndex;
                        }
                    }
                    // Add the list item with the numbering adjusted and nested structure
                    elements.push({
                        type: listType,
                        match: "",
                        subItems: explItems,
                        index
                    });
                    index += match[0].length; // Move index past the matched element
                    matched = true;
                    break;
                }

                // Special handling for ordered list items
                if (type === "ol") {
                    const listType = "ol";
                    const listItems = [];
                    let itemIndex = 0;

                    while (itemIndex < elementText.length) {
                        const linkMatch = /<a href="[^"]+">[^<]+<\/a>/.exec(
                            elementText.slice(itemIndex)
                        );
                        if (linkMatch && linkMatch.index === 0) {
                            listItems.push({
                                type: "link",
                                match: linkMatch[0],
                                index: itemIndex
                            });
                            itemIndex += linkMatch[0].length;
                        } else {
                            const nextLinkIndex = elementText.indexOf(
                                "<a href=",
                                itemIndex
                            );
                            const endIndex =
                                nextLinkIndex !== -1
                                    ? nextLinkIndex
                                    : elementText.length;
                            const plainTextMatch = elementText.slice(
                                itemIndex,
                                endIndex
                            );
                            if (plainTextMatch.trim()) {
                                listItems.push({
                                    type: "plainText",
                                    match: plainTextMatch,
                                    index: itemIndex
                                });
                            }
                            itemIndex = endIndex;
                        }
                    }

                    // Add the list item with the numbering adjusted and nested structure
                    elements.push({
                        type: listType,
                        match: `${olIndex}. `,
                        subItems: listItems,
                        index
                    });
                    olIndex++; // Increment the ordered list index
                    index += match[0].length; // Move index past the matched element
                    matched = true;
                    break;
                }

                // Special handling for unordered list items
                if (type === "ul") {
                    const listType = "ul";
                    const listItems = [];
                    let itemIndex = 0;

                    while (itemIndex < elementText.length) {
                        const linkMatch = /<a href="[^"]+">[^<]+<\/a>/.exec(
                            elementText.slice(itemIndex)
                        );
                        if (linkMatch && linkMatch.index === 0) {
                            listItems.push({
                                type: "link",
                                match: linkMatch[0],
                                index: itemIndex
                            });
                            itemIndex += linkMatch[0].length;
                        } else {
                            const nextLinkIndex = elementText.indexOf(
                                "<a href=",
                                itemIndex
                            );
                            const endIndex =
                                nextLinkIndex !== -1
                                    ? nextLinkIndex
                                    : elementText.length;
                            const plainTextMatch = elementText.slice(
                                itemIndex,
                                endIndex
                            );
                            if (plainTextMatch.trim()) {
                                listItems.push({
                                    type: "plainText",
                                    match: plainTextMatch,
                                    index: itemIndex
                                });
                            }
                            itemIndex = endIndex;
                        }
                    }

                    // Add the list item with nested structure
                    elements.push({
                        type: listType,
                        match: "",
                        subItems: listItems,
                        index
                    });
                    index += match[0].length; // Move index past the matched element
                    matched = true;
                    break;
                }

                // Add the matched element to the array if no inner link was found
                elements.push({ type, match: elementText, index });
                index += match[0].length; // Move index past the matched element
                matched = true;
                break;
            }
        }

        if (!matched) {
            let nextIndex = text.length;

            // Find the next match of any pattern in the remaining text
            for (const { regex } of patterns) {
                const nextMatch = regex.exec(text.slice(index));
                if (
                    nextMatch &&
                    nextMatch.index !== 0 &&
                    index + nextMatch.index < nextIndex
                ) {
                    nextIndex = index + nextMatch.index;
                }
            }

            const plainTextMatch = text.slice(index, nextIndex); // Get plain text until the next match
            if (plainTextMatch.trim()) {
                elements.push({
                    type: "plainText",
                    match: plainTextMatch,
                    index
                });
            }
            index = nextIndex; // Move index to the next potential match position
        }
    }

    return elements; // Return the array of parsed elements
}

function addMessage(sender, text, isPersonal) {
    const cursorSpan = document.createElement("span");
    cursorSpan.classList.add("cursor");
    const messageDiv = document.createElement("div");
    messageDiv.className = "message" + (isPersonal ? " message-personal" : "");

    const avatarHtml = `
    <figure class="avatar">
        <img src="${isPersonal ? "./static/icon1.PNG" : "./static/icon.PNG"
        }" alt="${sender}">
    </figure>`;

    const messageTextDiv = document.createElement("div");
    messageTextDiv.className = "text";

    const parsedResponse = parseText(text);
    console.log("parsedResponse", parsedResponse);

    let partIndex = 0;
    let charIndex = 0;

    const typeResponse = () => {
        if (partIndex < parsedResponse.length) {
            const messageText = messageDiv.querySelector(".text");
            const part = parsedResponse[partIndex];

            if (part.type === "link") {
                appendLink(messageText, part.match, part.index);
                partIndex++;
                charIndex = 0;
                typeResponse();
            } else {
                let element;
                if (part.type === "reset") {
                    partIndex++;
                    charIndex = 0;
                    typeResponse();
                    messagesContainer.scrollTop =
                        messagesContainer.scrollHeight;
                } else if (part.type === "plainText") {
                    element = document.createElement("span");
                    element.className = "s_p";
                    messageText.appendChild(element);
                    element.appendChild(cursorSpan);
                    typeElement(element, part.match, 0, () => {
                        checkNextLink(element);
                    });
                } else if (part.type === "header") {
                    element = document.createElement("h3");
                    messageText.appendChild(element);
                    element.appendChild(cursorSpan);
                    const headerText = part.match.replace(
                        /###([^#]+)###/,
                        "$1"
                    );
                    typeElement(element, headerText, 0, () => {
                        checkNextLink(element);
                    });
                } else if (part.type === "subheader") {
                    element = document.createElement("h4");
                    messageText.appendChild(element);
                    element.appendChild(cursorSpan);
                    const subHeaderText = part.match.replace(
                        /\*\*\*([^*]+)\*\*\*/,
                        "$1"
                    );
                    typeElement(element, subHeaderText, 0, () => {
                        checkNextLink(element);
                    });
                } else if (part.type === "ol") {
                    element = document.createElement("ol");
                    const li = document.createElement("li");
                    element.appendChild(li);
                    li.innerText = part.match;
                    li.classList.add("un_li");
                    messageText.appendChild(element);
                    li.appendChild(cursorSpan);
                    //console.log(part.subItems)
                    //const olText = part.match.replace(/-#([^#]*)-#/, '$1');
                    typeOlItems(li, part.subItems, () => {
                        checkNextLink(li);
                    });
                } else if (part.type === "ul") {
                    element = document.createElement("ul");
                    const li = document.createElement("li");
                    element.appendChild(li);
                    li.innerText = part.match;
                    //li.classList.add('un_li')
                    messageText.appendChild(element);
                    li.appendChild(cursorSpan);
                    //const ulText = part.match.replace(/-\*([^*]*)-\*/, '$1');
                    typeUlItems(li, part.subItems, () => {
                        checkNextLink(li);
                    });
                } else if (part.type === "expl") {
                    element = document.createElement("p");
                    element.className = "plain-text";
                    messageText.appendChild(element);
                    element.appendChild(cursorSpan);
                    typeExplItems(element, part.subItems, () => {
                        checkNextLink(element);
                    });
                }
            }
        } else {
            stopLoader(messageDiv);
            // convertLinks(messageDiv)
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    };

    const typeOlItems = (listElement, listItems, callback) => {
        //console.log("typeListItems called with:", listElement, listItems, callback);

        let itemIndex = 0;

        const typeNextItem = () => {
            if (listItems && itemIndex < listItems.length) {
                let listItem = listItems[itemIndex];
                let linkText = listItem.match;
                if (listItem.type === "link") {
                    appendLink(listElement, linkText);
                    itemIndex++;
                    typeNextItem();
                } else {
                    if (itemIndex < listItems.length) {
                        let olText = listItem.match.replace(
                            /-#([^#]*)-#|-#/,
                            "$1"
                        );
                        typeElement(listElement, olText, 0, () => {
                            //checkNextLink(listElement);
                            itemIndex++;
                            typeNextItem();
                        });
                    }
                }
            } else {
                callback();
            }
        };
        typeNextItem();
    };
    const typeUlItems = (listElement, listItems, callback) => {
        //console.log("typeListItems called with:", listElement, listItems, callback);

        let itemIndex = 0;

        const typeNextItem = () => {
            if (listItems && itemIndex < listItems.length) {
                let listItem = listItems[itemIndex];
                //let li = document.createElement('li');
                //listElement.appendChild(li);
                let linkText = listItem.match;
                if (listItem.type === "link") {
                    appendLink(listElement, linkText);
                    itemIndex++;
                    typeNextItem();
                } else {
                    if (itemIndex < listItems.length) {
                        let liText = listItem.match.replace(
                            /-\*([^*]*)-\*|-\*/,
                            "$1"
                        );
                        typeElement(listElement, liText, 0, () => {
                            //checkNextLink(listElement);
                            itemIndex++;
                            typeNextItem();
                        });
                    }
                }
            } else {
                callback();
            }
        };
        typeNextItem();
    };

    const typeExplItems = (explElement, explItems, callback) => {
        let itemIndex = 0;

        const typeNextItem = () => {
            if (explItems && itemIndex < explItems.length) {
                let explItem = explItems[itemIndex];
                let linkText = explItem.match;
                if (explItem.type === "link") {
                    appendLink(explElement, linkText);
                    itemIndex++;
                    typeNextItem();
                } else {
                    if (itemIndex < explItems.length) {
                        let explText = explItem.match.replace(
                            /-\|([^*]*)-\||-\|/,
                            "$1"
                        );
                        typeElement(explElement, explText, 0, () => {
                            itemIndex++;
                            typeNextItem();
                        });
                    }
                }
            } else {
                callback();
            }
        };
        typeNextItem();
    };

    const typeElement = (element, content, index, callback) => {
        const span = document.createElement("span");
        if (!element.querySelector("span")) {
            span.appendChild(cursorSpan);
            element.appendChild(span);
        }
        if (index < content.length) {
            // element.innerHTML += content[index];
            cursorSpan.insertAdjacentText("beforebegin", content[index]);
            setTimeout(() => {
                typeElement(element, content, index + 1, callback);
            }, 20); // Adjust the delay time as needed
        } else {
            cursorSpan.remove();
            callback();
        }
        // Automatically scroll to the bottom if autoScroll is true
        if (autoScroll) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    };

    const appendLink = (element, link, position) => {
        element.innerHTML += link;
    };

    const checkNextLink = currentElement => {
        partIndex++;
        if (
            partIndex < parsedResponse.length &&
            parsedResponse[partIndex].type === "link"
        ) {
            appendLink(currentElement, parsedResponse[partIndex].match);
            partIndex++;
        }
        typeResponse();
    };

    // const convertLinks = (responseText) => {
    //     const links = responseText.querySelectorAll("a");
    //     links.forEach((link) => {
    //         const href = link.getAttribute("href");
    //         link.textContent = href;
    //     });
    // }
    const messageTextHtml1 = ` ${isPersonal
        ? `
    <div class="message-text" tabindex="0">
        <div class="text"></div>
        <div class="timestamp"><p>${sender}</p><p class="time">${getCurrentTime()}</p></div>
    </div>
    `
        : `
    <div class="message-text" tabindex="0">
        <div class="text"></div>
        <div class="timestamp"><span class="assist">
        <p>${sender}</p>
        <span class="panel">
            <button>A</button>
            <button>B</button>
            <button>S</button>
        </span>
    </span>
    <p class="time">${getCurrentTime()}</p>    </div>
    //`
        }`;
    const messageTextHtml = `
    <div class="message-text" tabindex="0">
        <div class="text"></div>
        <div class="timestamp"><span class="assist"><p>${sender}</p></span><p class="time">${getCurrentTime()}</p></div>
    </div>`;

    messageDiv.innerHTML = isPersonal
        ? messageTextHtml + avatarHtml
        : avatarHtml + messageTextHtml;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    if (!isPersonal) {
        const messageText = messageDiv.querySelector(".text");
        const assistDiv = messageDiv.querySelector(".assist");
        assistDivM = assistDiv;
        messageText.innerHTML = "";
        startLoader();
        typeResponse();
    } else {
        const messageText = messageDiv.querySelector(".text");
        const as = messageDiv.querySelector(".assist");
        const edit = document.createElement("span");
        const messageTxt = messageText.parentElement.parentElement;
        messageText.innerHTML = text;
        edit.style.display = "none";
        edit.className = "panel";
        edit.innerHTML = `
            <button title="Edit" class="edit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
            </button>
            
            `;
        //<button class="send">Send</button>
        as.appendChild(edit);
        messageTxt.addEventListener("focus", () => {
            edit.style.display = "flex";
            messageTxt.classList.add("focused");
        });

        // Add event listeners for mouse enter and leave
        messageTxt.addEventListener("mouseenter", () => {
            edit.style.display = "flex";
            messageTxt.classList.add("focused");
        });

        messageTxt.addEventListener("blur", () => {
            setTimeout(() => {
                edit.style.display = "none";
                editBtn.style.display = "none";
                messageText.contentEditable = false;
                messageTxt.classList.remove("focused");
            }, 50);
        });

        messageTxt.addEventListener("mouseleave", () => {
            if (!messageTxt.contains(document.activeElement)) {
                edit.style.display = "none";
                messageTxt.classList.remove("focused");
            }
        });
        edit.addEventListener("click", () => {
            messageText.contentEditable = true;
            messageText.focus();
            edit.style.display = "none";
            const mt = as.closest(".message-text");
            if (!messageDiv.querySelector(".editBtns")) {
                mt.insertAdjacentHTML(
                    "afterend",
                    `<span class="editBtns">
                    <button class="cancelBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="var(--text-color)" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <button class="sendBtn" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                    </button>
                    </span>`
                );
            } else {
                messageDiv.querySelector(".editBtns").style.display = "flex";
            }
            const cancelBtn = messageDiv.querySelector(".cancelBtn");
            const sendBtn = messageDiv.querySelector(".sendBtn");

            sendBtn.addEventListener("click", event => {
                const sourceElement = event.currentTarget.closest(".message");
                const allMessages = Array.from(
                    messagesContainer.querySelectorAll(".message")
                );
                const sourceIndex = allMessages.indexOf(sourceElement);
                let message_text = messageText.innerText.trim();
                if (!generating) {
                    messageInput.value = message_text;
                    sourceElement.remove();
                    for (let i = sourceIndex; i < allMessages.length; i++) {
                        allMessages[i].remove();
                    }
                    console.log("Sending...", message_text);
                    sendMessage();
                } else {
                    kk.style.color = "#ee5855";
                    kk.innerText =
                        "Please wait for the current generation to end...";
                    setTimeout(() => {
                        kk.style.color = "var(--text-color)";
                        kk.innerText = "Suggested Prompts:";
                    }, 2000);
                    return;
                }
            });

            cancelBtn.addEventListener("click", () => {
                cancelBtn.closest(".editBtns").remove();
                messageText.innerHTML = text;
                messageText.contentEditable = false;
                console.log("cancelling");
                edit.style.display = "none";
            });
        });
    }
}

function addMessage(sender, text, isPersonal) {
    const cursorSpan = document.createElement("span");
    cursorSpan.classList.add("cursor");
    const messageDiv = document.createElement("div");
    messageDiv.className = "message" + (isPersonal ? " message-personal" : "");

    const avatarHtml = `
    <figure class="avatar">
        <img src="${isPersonal ? "./static/icon1.PNG" : "./static/icon.PNG"
        }" alt="${sender}">
    </figure>`;

    const messageTextDiv = document.createElement("div");
    messageTextDiv.className = "text";

    const parsedResponse = parseText(text);
    console.log("parsedResponse", parsedResponse);

    let partIndex = 0;
    let charIndex = 0;

    const typeResponse = () => {
        if (partIndex < parsedResponse.length) {
            const messageText = messageDiv.querySelector(".text");
            const part = parsedResponse[partIndex];

            if (part.type === "link") {
                appendLink(messageText, part.match, part.index);
                partIndex++;
                charIndex = 0;
                typeResponse();
            } else {
                let element;
                if (part.type === "reset") {
                    partIndex++;
                    charIndex = 0;
                    typeResponse();
                    messagesContainer.scrollTop =
                        messagesContainer.scrollHeight;
                } else if (part.type === "plainText") {
                    element = document.createElement("span");
                    element.className = "s_p";
                    messageText.appendChild(element);
                    element.appendChild(cursorSpan);
                    typeElement(element, part.match, 0, () => {
                        checkNextLink(element);
                    });
                } else if (part.type === "header") {
                    element = document.createElement("h3");
                    messageText.appendChild(element);
                    element.appendChild(cursorSpan);
                    const headerText = part.match.replace(
                        /###([^#]+)###/,
                        "$1"
                    );
                    typeElement(element, headerText, 0, () => {
                        checkNextLink(element);
                    });
                } else if (part.type === "subheader") {
                    element = document.createElement("h4");
                    messageText.appendChild(element);
                    element.appendChild(cursorSpan);
                    const subHeaderText = part.match.replace(
                        /\*\*\*([^*]+)\*\*\*/,
                        "$1"
                    );
                    typeElement(element, subHeaderText, 0, () => {
                        checkNextLink(element);
                    });
                } else if (part.type === "ol") {
                    element = document.createElement("ol");
                    const li = document.createElement("li");
                    element.appendChild(li);
                    li.innerText = part.match;
                    li.classList.add("un_li");
                    messageText.appendChild(element);
                    li.appendChild(cursorSpan);
                    //console.log(part.subItems)
                    //const olText = part.match.replace(/-#([^#]*)-#/, '$1');
                    typeOlItems(li, part.subItems, () => {
                        checkNextLink(li);
                    });
                } else if (part.type === "ul") {
                    element = document.createElement("ul");
                    const li = document.createElement("li");
                    element.appendChild(li);
                    li.innerText = part.match;
                    //li.classList.add('un_li')
                    messageText.appendChild(element);
                    li.appendChild(cursorSpan);
                    //const ulText = part.match.replace(/-\*([^*]*)-\*/, '$1');
                    typeUlItems(li, part.subItems, () => {
                        checkNextLink(li);
                    });
                } else if (part.type === "expl") {
                    element = document.createElement("p");
                    element.className = "plain-text";
                    messageText.appendChild(element);
                    element.appendChild(cursorSpan);
                    typeExplItems(element, part.subItems, () => {
                        checkNextLink(element);
                    });
                }
            }
        } else {
            stopLoader(messageDiv);
            // convertLinks(messageDiv)
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    };

    const typeOlItems = (listElement, listItems, callback) => {
        //console.log("typeListItems called with:", listElement, listItems, callback);

        let itemIndex = 0;

        const typeNextItem = () => {
            if (listItems && itemIndex < listItems.length) {
                let listItem = listItems[itemIndex];
                let linkText = listItem.match;
                if (listItem.type === "link") {
                    appendLink(listElement, linkText);
                    itemIndex++;
                    typeNextItem();
                } else {
                    if (itemIndex < listItems.length) {
                        let olText = listItem.match.replace(
                            /-#([^#]*)-#|-#/,
                            "$1"
                        );
                        typeElement(listElement, olText, 0, () => {
                            //checkNextLink(listElement);
                            itemIndex++;
                            typeNextItem();
                        });
                    }
                }
            } else {
                callback();
            }
        };
        typeNextItem();
    };
    const typeUlItems = (listElement, listItems, callback) => {
        //console.log("typeListItems called with:", listElement, listItems, callback);

        let itemIndex = 0;

        const typeNextItem = () => {
            if (listItems && itemIndex < listItems.length) {
                let listItem = listItems[itemIndex];
                //let li = document.createElement('li');
                //listElement.appendChild(li);
                let linkText = listItem.match;
                if (listItem.type === "link") {
                    appendLink(listElement, linkText);
                    itemIndex++;
                    typeNextItem();
                } else {
                    if (itemIndex < listItems.length) {
                        let liText = listItem.match.replace(
                            /-\*([^*]*)-\*|-\*/,
                            "$1"
                        );
                        typeElement(listElement, liText, 0, () => {
                            //checkNextLink(listElement);
                            itemIndex++;
                            typeNextItem();
                        });
                    }
                }
            } else {
                callback();
            }
        };
        typeNextItem();
    };

    const typeExplItems = (explElement, explItems, callback) => {
        let itemIndex = 0;

        const typeNextItem = () => {
            if (explItems && itemIndex < explItems.length) {
                let explItem = explItems[itemIndex];
                let linkText = explItem.match;
                if (explItem.type === "link") {
                    appendLink(explElement, linkText);
                    itemIndex++;
                    typeNextItem();
                } else {
                    if (itemIndex < explItems.length) {
                        let explText = explItem.match.replace(
                            /-\|([^*]*)-\||-\|/,
                            "$1"
                        );
                        typeElement(explElement, explText, 0, () => {
                            itemIndex++;
                            typeNextItem();
                        });
                    }
                }
            } else {
                callback();
            }
        };
        typeNextItem();
    };

    const typeElement = (element, content, index, callback) => {
        const span = document.createElement("span");
        if (!element.querySelector("span")) {
            span.appendChild(cursorSpan);
            element.appendChild(span);
        }
        if (index < content.length) {
            // element.innerHTML += content[index];
            cursorSpan.insertAdjacentText("beforebegin", content[index]);
            setTimeout(() => {
                typeElement(element, content, index + 1, callback);
            }, 20); // Adjust the delay time as needed
        } else {
            cursorSpan.remove();
            callback();
        }
        // Automatically scroll to the bottom if autoScroll is true
        if (autoScroll) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    };

    const appendLink = (element, link, position) => {
        element.innerHTML += link;
    };

    const checkNextLink = currentElement => {
        partIndex++;
        if (
            partIndex < parsedResponse.length &&
            parsedResponse[partIndex].type === "link"
        ) {
            appendLink(currentElement, parsedResponse[partIndex].match);
            partIndex++;
        }
        typeResponse();
    };

    // const convertLinks = (responseText) => {
    //     const links = responseText.querySelectorAll("a");
    //     links.forEach((link) => {
    //         const href = link.getAttribute("href");
    //         link.textContent = href;
    //     });
    // }
    const messageTextHtml1 = ` ${isPersonal
        ? `
    <div class="message-text" tabindex="0">
        <div class="text"></div>
        <div class="timestamp"><p>${sender}</p><p class="time">${getCurrentTime()}</p></div>
    </div>
    `
        : `
    <div class="message-text" tabindex="0">
        <div class="text"></div>
        <div class="timestamp"><span class="assist">
        <p>${sender}</p>
        <span class="panel">
            <button>A</button>
            <button>B</button>
            <button>S</button>
        </span>
    </span>
    <p class="time">${getCurrentTime()}</p>    </div>
    `
        }`;
    const messageTextHtml = `
    <div class="message-text" tabindex="0">
        <div class="text"></div>
        <div class="timestamp"><span class="assist"><p>${sender}</p></span><p class="time">${getCurrentTime()}</p></div>
    </div>`;

    messageDiv.innerHTML = isPersonal
        ? messageTextHtml + avatarHtml
        : avatarHtml + messageTextHtml;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    if (!isPersonal) {
        const messageText = messageDiv.querySelector(".text");
        const assistDiv = messageDiv.querySelector(".assist");
        assistDivM = assistDiv;
        messageText.innerHTML = "";
        startLoader();
        typeResponse();
    } else {
        const messageText = messageDiv.querySelector(".text");
        const as = messageDiv.querySelector(".assist");
        const edit = document.createElement("span");
        const messageTxt = messageText.parentElement.parentElement;
        messageText.innerHTML = text;
        edit.style.display = "none";
        edit.className = "panel";
        edit.innerHTML = `
            <button title="Edit" class="edit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
            </button>
            
            `;
        //<button class="send">Send</button>
        as.appendChild(edit);
        messageTxt.addEventListener("focus", () => {
            edit.style.display = "flex";
            messageTxt.classList.add("focused");
        });

        // Add event listeners for mouse enter and leave
        messageTxt.addEventListener("mouseenter", () => {
            edit.style.display = "flex";
            messageTxt.classList.add("focused");
        });

        messageTxt.addEventListener("blur", () => {
            setTimeout(() => {
                edit.style.display = "none";
                editBtn.style.display = "none";
                messageText.contentEditable = false;
                messageTxt.classList.remove("focused");
            }, 50);
        });

        messageTxt.addEventListener("mouseleave", () => {
            if (!messageTxt.contains(document.activeElement)) {
                edit.style.display = "none";
                messageTxt.classList.remove("focused");
            }
        });
        edit.addEventListener("click", () => {
            messageText.contentEditable = true;
            messageText.focus();
            edit.style.display = "none";
            const mt = as.closest(".message-text");
            if (!messageDiv.querySelector(".editBtns")) {
                mt.insertAdjacentHTML(
                    "afterend",
                    `<span class="editBtns">
                    <button class="cancelBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="var(--text-color)" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <button class="sendBtn" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                    </button>
                    </span>`
                );
            } else {
                messageDiv.querySelector(".editBtns").style.display = "flex";
            }
            const cancelBtn = messageDiv.querySelector(".cancelBtn");
            const sendBtn = messageDiv.querySelector(".sendBtn");

            sendBtn.addEventListener("click", event => {
                const sourceElement = event.currentTarget.closest(".message");
                const allMessages = Array.from(
                    messagesContainer.querySelectorAll(".message")
                );
                const sourceIndex = allMessages.indexOf(sourceElement);
                let message_text = messageText.innerText.trim();
                if (!generating) {
                    messageInput.value = message_text;
                    sourceElement.remove();
                    for (let i = sourceIndex; i < allMessages.length; i++) {
                        allMessages[i].remove();
                    }
                    console.log("Sending...", message_text);
                    sendMessage();
                } else {
                    kk.style.color = "#ee5855";
                    kk.innerText =
                        "Please wait for the current generation to end...";
                    setTimeout(() => {
                        kk.style.color = "var(--text-color)";
                        kk.innerText = "Suggested Prompts:";
                    }, 2000);
                    return;
                }
            });

            cancelBtn.addEventListener("click", () => {
                cancelBtn.closest(".editBtns").remove();
                messageText.innerHTML = text;
                messageText.contentEditable = false;
                console.log("cancelling");
                edit.style.display = "none";
            });
        });
    }
}

function addSampleMessages(messages) {
    if (!Array.isArray(messages)) {
        console.error('Expected an array of messages');
        return;
    }

    messages.forEach(function (messageObj, messageIndex) {
        displayCurrentMessage(messageObj);
        messageIndex++;
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        const loadingMessage = document.querySelectorAll(".messages .loading");
        if (loadingMessage.length > 0) {
            loadingMessage.forEach(function (loader) {
                loader.remove();
            });
            generating = false;
            console.log("loader stopped");
        }
    });
}

function displayCurrentMessage(messageObj) {
    setTimeout(() => { }, 200);
    defaultText.remove();
    if (messageObj && messageObj.message && Array.isArray(messageObj.message)) {
        if (messageObj.message.length > 1) {
            currentTextIndex = messageObj.message.length - 1;
        } else {
            currentTextIndex = 0;
        }

        const textObj = messageObj.message[currentTextIndex];
        console.log("Messages:", messageObj);

        // Display the main message
        addNavigableResponse("You", textObj.text, true, messageObj);

        // Display the first response with navigation
        if (textObj) {
            addNavigableResponse("MKSU-VA", textObj.responses, false, messageObj);
        } else {
            addNavigableResponse("MKSU-VA", textObj.responses, false, messageObj);
        }

        if (document.querySelector(".loading")) {
            stopLoader();
        }
    } else {
        console.error('Invalid message object:', messageObj);
    }
}

// Function to update the message text
function updateMessageText(messagesSpan, newText) {
    // Find the message div with the class name 'message-personal' just above the current message div
    //const personalMessageDiv = messageDiv.previousElementSibling;
    const personalMessageDiv = messagesSpan.previousElementSibling;
    if (
        personalMessageDiv &&
        personalMessageDiv.classList.contains("message-personal")
    ) {
        personalMessageDiv.querySelector(".text").textContent = newText;
    }
}

// Function to update the response
function updateResponse(messageText, text, animateText) {
    messageText.innerHTML = "";
    const parsedResponse = parseText(text);
    const cursorSpan = document.createElement("span");
    cursorSpan.classList.add("cursor");
    console.log("parsedResponse", parsedResponse);
    // console.log("parsedResponse", messageText.parentElement);
    //console.log("parsedResponse", messageText);
    //console.log("aa", animateText);
    let partIndex = 0;
    autoScroll = true;

    const typeResponse = () => {
        if (partIndex < parsedResponse.length) {
            const part = parsedResponse[partIndex];

            if (part.type === "link") {
                appendLink(messageText, part.match, part.index);
                partIndex++;
                charIndex = 0;
                typeResponse();
            } else {
                let element;
                if (part.type === "reset") {
                    partIndex++;
                    charIndex = 0;
                    typeResponse();
                    //messagesContainer.scrollTop = messagesContainer.scrollHeight;
                } else if (part.type === "plainText") {
                    element = document.createElement("span");
                    element.className = "s_p";
                    messageText.appendChild(element);
                    element.appendChild(cursorSpan);
                    typeElement(element, part.match, 0, () => {
                        checkNextLink(element);
                    });
                } else if (part.type === "header") {
                    element = document.createElement("h3");
                    messageText.appendChild(element);
                    element.appendChild(cursorSpan);
                    const headerText = part.match.replace(
                        /###([^#]+)###/,
                        "$1"
                    );
                    typeElement(element, headerText, 0, () => {
                        checkNextLink(element);
                    });
                } else if (part.type === "subheader") {
                    element = document.createElement("h4");
                    messageText.appendChild(element);
                    element.appendChild(cursorSpan);
                    const subHeaderText = part.match.replace(
                        /\*\*\*([^*]+)\*\*\*/,
                        "$1"
                    );
                    typeElement(element, subHeaderText, 0, () => {
                        checkNextLink(element);
                    });
                } else if (part.type === "ol") {
                    element = document.createElement("ol");
                    const li = document.createElement("li");
                    element.appendChild(li);
                    li.innerText = part.match;
                    li.classList.add("un_li");
                    messageText.appendChild(element);
                    li.appendChild(cursorSpan);
                    //console.log(part.subItems)
                    //const olText = part.match.replace(/-#([^#]*)-#/, '$1');
                    typeOlItems(li, part.subItems, () => {
                        checkNextLink(li);
                    });
                } else if (part.type === "ul") {
                    element = document.createElement("ul");
                    const li = document.createElement("li");
                    element.appendChild(li);
                    li.innerText = part.match;
                    //li.classList.add('un_li')
                    messageText.appendChild(element);
                    li.appendChild(cursorSpan);
                    //const ulText = part.match.replace(/-\*([^*]*)-\*/, '$1');
                    typeUlItems(li, part.subItems, () => {
                        checkNextLink(li);
                    });
                } else if (part.type === "expl") {
                    element = document.createElement("p");
                    element.className = "plain-text";
                    messageText.appendChild(element);
                    element.appendChild(cursorSpan);
                    typeExplItems(element, part.subItems, () => {
                        checkNextLink(element);
                    });
                }
            }
        } else {
            if (document.querySelector(".loading")) {
                stopLoader();
            }

            // convertLinks(messageDiv)
            //messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    };

    const typeOlItems = (listElement, listItems, callback) => {
        //console.log("typeListItems called with:", listElement, listItems, callback);

        let itemIndex = 0;

        const typeNextItem = () => {
            if (listItems && itemIndex < listItems.length) {
                let listItem = listItems[itemIndex];
                let linkText = listItem.match;
                if (listItem.type === "link") {
                    appendLink(listElement, linkText);
                    itemIndex++;
                    typeNextItem();
                } else {
                    if (itemIndex < listItems.length) {
                        let olText = listItem.match.replace(
                            /-#([^#]*)-#|-#/,
                            "$1"
                        );
                        typeElement(listElement, olText, 0, () => {
                            //checkNextLink(listElement);
                            itemIndex++;
                            typeNextItem();
                        });
                    }
                }
            } else {
                callback();
            }
        };
        typeNextItem();
    };
    const typeUlItems = (listElement, listItems, callback) => {
        //console.log("typeListItems called with:", listElement, listItems, callback);

        let itemIndex = 0;

        const typeNextItem = () => {
            if (listItems && itemIndex < listItems.length) {
                let listItem = listItems[itemIndex];
                //let li = document.createElement('li');
                //listElement.appendChild(li);
                let linkText = listItem.match;
                if (listItem.type === "link") {
                    appendLink(listElement, linkText);
                    itemIndex++;
                    typeNextItem();
                } else {
                    if (itemIndex < listItems.length) {
                        let liText = listItem.match.replace(
                            /-\*([^*]*)-\*|-\*/,
                            "$1"
                        );
                        typeElement(listElement, liText, 0, () => {
                            //checkNextLink(listElement);
                            itemIndex++;
                            typeNextItem();
                        });
                    }
                }
            } else {
                callback();
            }
        };
        typeNextItem();
    };
    const typeExplItems = (explElement, explItems, callback) => {
        let itemIndex = 0;

        const typeNextItem = () => {
            if (explItems && itemIndex < explItems.length) {
                let explItem = explItems[itemIndex];
                let linkText = explItem.match;
                if (explItem.type === "link") {
                    appendLink(explElement, linkText);
                    itemIndex++;
                    typeNextItem();
                } else {
                    if (itemIndex < explItems.length) {
                        let explText = explItem.match.replace(
                            /-\|([^*]*)-\||-\|/,
                            "$1"
                        );
                        typeElement(explElement, explText, 0, () => {
                            itemIndex++;
                            typeNextItem();
                        });
                    }
                }
            } else {
                callback();
            }
        };
        typeNextItem();
    };
    const typeElement1 = (element, content, index, callback) => {
        const span = document.createElement("span");
        if (!element.querySelector("span")) {
            span.appendChild(cursorSpan);
            element.appendChild(span);
        }
        if (index < content.length) {
            // element.innerHTML += content[index];
            cursorSpan.insertAdjacentText("beforebegin", content[index]);
            if (animateText || (generating && document.hidden)) {
                typingAnimation = setTimeout(() => {
                    typeElement(element, content, index + 1, callback);
                }, 20);
            } else {
                typeElement(element, content, index + 1, callback);
            }
        } else {
            cursorSpan.remove();
            callback();
        }
        // Automatically scroll to the bottom if autoScroll is true
        if (autoScroll && animateText) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    };

    const typeElement = (element, content, index, callback) => {
        if (index < content.length) {
            const span = document.createElement("span");
            if (!element.querySelector("span")) {
                span.appendChild(cursorSpan);
                element.appendChild(span);
            }
            // cursorSpan.insertAdjacentText("beforebegin", content[index]);
            // element.innerHTML += content[index];
            element.insertAdjacentElement("beforeend", cursorSpan);
            cursorSpan.insertAdjacentText("beforebegin", content[index]);
            if (animateText || (generating && document.hidden)) {
                typingAnimation = setTimeout(() => {
                    typeElement(element, content, index + 1, callback);
                }, 20);
            } else {
                typeElement(element, content, index + 1, callback);
            }
        } else {
            cursorSpan.remove();
            callback();
        }
        // Automatically scroll to the bottom if autoScroll is true
        if (autoScroll && animateText) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    };

    const appendLink = (element, link, position) => {
        // Create a temporary div element
        // const tempDiv = document.createElement("div");
        // tempDiv.innerHTML = link;
        // if (isSpeaking) {
        //     convertTextToSpeech(tempDiv.querySelector("a").textContent);
        // }
        element.innerHTML += link;
    };

    const checkNextLink = (currentElement) => {
        partIndex++;
        if (
            partIndex < parsedResponse.length &&
            parsedResponse[partIndex].type === "link"
        ) {
            appendLink(currentElement, parsedResponse[partIndex].match);
            partIndex++;
            /*typeElement(currentElement, parsedResponse[partIndex].match, 0, () => {
                        checkNextLink(currentElement);
                    });*/
        }
        typeResponse();
    };
    typeResponse();
}

function addNavigableResponse(
    sender,
    responses,
    isPersonal,
    messageObj,
    targetElement,
    animateText
) {
    // Function to generate a new response (replace this with your actual logic)
    //currentResponseIndex = messageObj.message[currentTextIndex].responses.length - 1;
    //currentTextIndex;
    console.log("res", responses);
    currentResponseIndex = responses.length - 1;
    //currentResponseIndex = responses.length - 1;
    //currentTextIndex = messageObj.message.length - 1;
    let textObj = messageObj.message[currentTextIndex];
    if (isPersonal) {
        let text = responses;
        const messageDiv = createMessageDiv(
            isPersonal,
            responses[0],
            sender,
            "/static/chat_app/images/icon1.PNG",
            0,
            0
        );

        messagesContainer.appendChild(messageDiv);
        const messageText = messageDiv.querySelector(".text");
        const as = messageDiv.querySelector(".assist");
        const edit = document.createElement("span");
        messageText.textContent = text;
        edit.style.display = "none";
        edit.className = "panel";
        edit.innerHTML = `
            <button title="Edit" class="edit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
            </button>
            
            `;
        const editBtns = document.createElement("span");
        editBtns.className = "editBtns";
        editBtns.innerHTML = `
                    <button class="cancelBtn" title="cancel">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="var(--text-color)" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <button class="sendBtn" title="send">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                    </button>
                    `;

        //<button class="send">Send</button>
        as.appendChild(edit);
        messageDiv.addEventListener("focus", () => {
            edit.style.display = "flex";
            messageDiv.classList.add("focused");
        });

        // Add event listeners for mouse enter and leaves
        messageDiv.addEventListener("mouseenter", () => {
            edit.style.display = "flex";
            messageDiv.classList.add("focused");
        });

        messageDiv.addEventListener("blur", () => {
            setTimeout(() => {
                edit.classList.add("hidden");
                editBtns.classList.add("hidden");
                messageText.contentEditable = false;
                messageDiv.classList.remove("focused");
            }, 50);
        });

        messageDiv.addEventListener("mouseleave", () => {
            edit.style.display = "none";
            if (!messageDiv.contains(document.activeElement)) {
                editBtns.classList.add("hidden");
                messageDiv.classList.remove("focused");
            }
        });

        edit.addEventListener("click", () => {
            messageText.contentEditable = true;
            messageText.focus();
            edit.style.display = "none";
            const mt = as.closest(".message-text");
            if (!messageDiv.querySelector(".editBtns")) {
                mt.insertAdjacentElement("afterend", editBtns);
            } else {
                messageDiv.querySelector(".editBtns").style.display = "flex";
            }
            const cancelBtn = messageDiv.querySelector(".cancelBtn");
            const sendBtn = messageDiv.querySelector(".sendBtn");

            sendBtn.addEventListener("click", (event) => {
                const sourceElement = event.currentTarget.closest('.message-personal');
                console.log('td', sourceElement.getAttribute('data-text-index'))
                clearTimeout(typingAnimation);
                let newTextMessage = messageText.textContent;
                messageText.contentEditable = false;
                if (!generating) {
                    console.log("Sending...", newTextMessage);
                    let prompt = { 'prompt': newTextMessage };
                    let newMessageObj = {
                        text: newTextMessage,
                        responses: []
                    };
                    if (messagesContainer.querySelector('.error-message')) {
                        messagesContainer.querySelector('.error-message').remove();
                    }

                    let nextResponseElement = sourceElement.nextElementSibling;
                    let targetElement;
                    if (nextResponseElement && !nextResponseElement.classList.contains('.response')) {
                        //nextResponseElement.remove();
                        nextResponseElement.style.marginTop = "0rem";
                        targetElement = nextResponseElement
                    }

                    simulatedFetch("/getResponse", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(prompt)
                    })
                        .then((data) => {
                            if (kk.classList.contains("error")) {
                                kk.classList.remove("error");
                            }
                            editBtns.style.display = "none";
                            return data.json();
                        })
                        .then((data) => {
                            let newResponse = data["response"];
                            // Update the current textObj with the new response
                            newMessageObj.responses.push(newResponse);
                            messageObj.message.push(newMessageObj);
                            console.log(messageObj)
                            currentIndex = messageObj.message.length - 1;
                            sourceElement.setAttribute('data-text-index', currentIndex)
                            updateMessageText(targetElement, newTextMessage)
                            addNavigableResponse("MKSU-VA", newMessageObj.responses, false, messageObj, targetElement, true);

                            fetchedSug = data["suggestions"]; // const suggestions = data.suggestions;
                            // Update suggestions
                            suggestionClass.innerHTML = "";
                            addSuggestions(fetchedSug);
                            // Clear the input field
                            messageInput.value = "";
                            nextResponseElement.querySelector('.nav-info').textContent = `Response ${currentResponseIndex + 1} of ${textObj.responses.length}, Text ${currentTextIndex + 1} of ${messageObj.message.length}`;
                            nextResponseElement.querySelector('.right').setAttribute('data-current-text-index', currentTextIndex);
                            nextResponseElement.querySelector('.left').setAttribute('data-current-response-index', currentResponseIndex);
                        })
                        .catch((error) => {
                            generating = false;
                            console.log("Error fetching response!!", error);
                            suggestionClass.innerHTML = '';
                            kk.innerText = "Error fetching suggestions!!";
                            kk.classList.add('error');
                            console.log("Error fetching suggestions!!", error);
                            const errorMessage = document.createElement('div');
                            errorMessage.className = 'error-message';
                            errorMessage.innerHTML = `
                        <span>
                            <p class="error-text"></p>
                            <button class="retry">Retry</button>
                        </span>
                        `;
                            messagesContainer.insertAdjacentElement('beforeend', errorMessage);
                            const retryBtn = errorMessage.querySelector('.retry')
                            const errorTxt = errorMessage.querySelector('.error-text')
                            errorTxt.innerText = "Error:\n An error occurred  while generating response!!  Please check your connection and tap to retry. If this persists please contact the administrator..."
                            retryBtn.addEventListener('click', function (e) {
                                clearTimeout(typingAnimation);
                                panel.querySelector('.regenerate').click();
                            });
                            messagesContainer.scrollTop = messagesContainer.scrollHeight;
                            stopLoader();
                        })
                } else {
                    kk.style.color = "#ee5855";
                    kk.innerText =
                        "Please wait for the current generation to end...";
                    setTimeout(() => {
                        kk.style.color = "var(--text-color)";
                        kk.innerText = "Suggested Prompts:";
                    }, 2000);
                    return;
                }
            });

            cancelBtn.addEventListener("click", () => {
                //cancelBtn.closest('.editBtns').remove();
                messageText.innerHTML = text;
                messageText.contentEditable = false;
                console.log("cancelling");
                edit.style.display = "none";
                editBtns.style.display = "none";
            });
        });

    } else {
        const messageDiv = createMessageDiv(
            isPersonal,
            responses[0],
            sender,
            "/static/chat_app/images/icon.PNG",
            0,
            0
        );
        const messagesSpan = document.createElement("div");
        messagesSpan.className = "messages-span";
        messagesSpan.classList.add("flexx");
        messagesSpan.classList.add("response");
        messagesSpan.appendChild(messageDiv);
        messagesSpan.style.marginTop = "1rem";
        let responseDiv = messageDiv.querySelector(".text");
        //const responseDiv = document.createElement("div");
        //responseDiv.className = "response";
        //responseDiv.classList.add('response');
        //responseDiv.innerHTML = responses[0];
        updateResponse(responseDiv, responses[0], animateText);
        //console.log(messageDiv.querySelector('.assist'))
        //TODO: NO NEED FOR textDiv

        if (messageObj.message.length > 1 || responses.length > 1) {
            const navigationDiv = document.createElement("div");
            navigationDiv.className = "navigation";
            messagesSpan.style.marginTop = "0rem";

            var prevButton = document.createElement("button");
            prevButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>';
            prevButton.className = "nav-button left";
            //prevButton.disabled = true; // Initially disabled
            prevButton.setAttribute('data-current-text-index', currentTextIndex);
            prevButton.setAttribute('data-current-response-index', currentResponseIndex);

            var nextButton = document.createElement("button");
            nextButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>';
            nextButton.className = "nav-button right";
            nextButton.setAttribute('data-current-text-index', currentTextIndex);
            nextButton.setAttribute('data-current-response-index', currentResponseIndex);
            nextButton.disabled = true; // Initially disabled


            const infoText = document.createElement("span");
            infoText.className = "nav-info timestamp";
            infoText.textContent = getNavigationInfoText(messageObj, currentTextIndex, responses.length - 1);

            navigationDiv.appendChild(prevButton);
            navigationDiv.appendChild(infoText);
            navigationDiv.appendChild(nextButton);

            if (targetElement) {
                if (!targetElement.querySelector('.navigation')) {
                    targetElement.insertAdjacentElement('afterbegin', navigationDiv);
                }
                responseDiv = targetElement.querySelector('.text')
                const nxt = targetElement.querySelector('.right')
                nxt.disabled = false;
                // for (let i = 0; i <= responses.length - 1; i++) {
                //     nxt.click();
                // }
                responseDiv.textContent = "";
                //autoScroll = true;
                updateResponse(responseDiv, responses[currentResponseIndex], true);
            } else {
                messagesSpan.insertAdjacentElement('afterbegin', navigationDiv);
                messagesContainer.appendChild(messagesSpan);

                updateResponse(responseDiv, responses[currentResponseIndex], animateText);
            }

            //let textObj = messageObj.message[currentTextIndex];

            prevButton.addEventListener("click", (event) => {
                clearTimeout(typingAnimation);
                let button = event.target.closest('button');
                let nxtButton = button.parentElement.querySelector('.right');
                currentTextIndex = parseInt(button.getAttribute('data-current-text-index'));
                currentResponseIndex = parseInt(button.getAttribute('data-current-response-index'));
                if (currentResponseIndex > 0) {
                    currentResponseIndex--;
                    button.setAttribute('data-current-response-index', currentResponseIndex);
                    nxtButton.setAttribute('data-current-response-index', currentResponseIndex);
                    //responseDiv.innerHTML = responses[currentResponseIndex];
                    updateResponse(responseDiv, textObj.responses[currentResponseIndex], false);
                    nextButton.disabled = false;
                } else if (currentTextIndex > 0) {
                    currentTextIndex--;
                    const newTextObj = messageObj.message[currentTextIndex];
                    currentResponseIndex = newTextObj.responses.length - 1;
                    //responseDiv.innerHTML = newTextObj.responses[currentResponseIndex];
                    //textDiv.textContent = newTextObj.text
                    updateMessageText(messagesSpan, newTextObj.text);
                    updateResponse(responseDiv, newTextObj.responses[currentResponseIndex], false);
                    textObj = newTextObj;
                    button.setAttribute('data-current-text-index', currentTextIndex);
                    button.setAttribute('data-current-response-index', currentResponseIndex);
                    nxtButton.setAttribute('data-current-text-index', currentTextIndex);
                    nxtButton.setAttribute('data-current-response-index', currentResponseIndex);
                }
                infoText.textContent = `Response ${currentResponseIndex + 1} of ${textObj.responses.length}, Text ${currentTextIndex + 1} of ${messageObj.message.length}`;
                updateButtonState(prevButton, nextButton, currentResponseIndex, currentTextIndex, messageObj);

            });
            console.log('currentTextIndex', currentTextIndex)
            console.log('currentResponseIndex', currentResponseIndex)

            nextButton.addEventListener("click", (event) => {
                clearTimeout(typingAnimation);
                let button = event.target.closest('button');
                let prvButton = button.parentElement.querySelector('.left');
                let currentTextIndex = parseInt(button.getAttribute('data-current-text-index'));
                let currentResponseIndex = parseInt(button.getAttribute('data-current-response-index'));
                if (currentResponseIndex < textObj.responses.length - 1) {
                    currentResponseIndex++;
                    button.setAttribute('data-current-response-index', currentResponseIndex);
                    prvButton.setAttribute('data-current-response-index', currentResponseIndex);
                    //responseDiv.innerHTML = responses[currentResponseIndex];
                    updateResponse(responseDiv, textObj.responses[currentResponseIndex], false);
                    prevButton.disabled = false;
                } else if (currentTextIndex < messageObj.message.length - 1) {
                    currentTextIndex++;
                    currentResponseIndex = 0;
                    const newTextObj = messageObj.message[currentTextIndex];
                    console.log('nn:', newTextObj)
                    //responseDiv.innerHTML = newTextObj.responses[currentResponseIndex];
                    updateMessageText(messagesSpan, newTextObj.text);
                    updateResponse(responseDiv, newTextObj.responses[currentResponseIndex], false);
                    textObj = newTextObj;
                    button.setAttribute('data-current-text-index', currentTextIndex);
                    button.setAttribute('data-current-response-index', currentResponseIndex);
                    prvButton.setAttribute('data-current-text-index', currentTextIndex);
                    prvButton.setAttribute('data-current-response-index', currentResponseIndex);
                }
                console.log('currentTextIndex', currentTextIndex)
                console.log('currentResponseIndex', currentResponseIndex)
                infoText.textContent = `Response ${currentResponseIndex + 1} of ${textObj.responses.length}, Text ${currentTextIndex + 1} of ${messageObj.message.length}`;
                updateButtonState(prevButton, nextButton, currentResponseIndex, currentTextIndex, messageObj);

            });
            function updateButtonState(prevButton, nextButton, currentResponseIndex, currentTextIndex, messageObj) {
                prevButton.disabled = currentResponseIndex === 0 && currentTextIndex === 0;
                nextButton.disabled = currentResponseIndex === messageObj.message[currentTextIndex].responses.length - 1 && currentTextIndex === messageObj.message.length - 1;
            }

        }
        //messagesSpan.appendChild(messageDiv)
        if (!targetElement) {
            //messagesSpan.style.marginTop = "1rem";
            messagesContainer.appendChild(messagesSpan);
        }
        const assistDiv = messageDiv.querySelector(".assist");
        assistDivM = assistDiv;
        startLoader();
        const panel = document.createElement("span");
        autoScroll = true;
        panel.style.display = "none";
        panel.className = "panel";
        panel.innerHTML = `
                <button title="Speak" class="speak">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                </svg>
                </button>
                <button title="Copy" class="copy_btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6"> 
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                </svg>
                </button>
                <button title="Regenerate" class="regenerate"">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd"
                    d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                    clip-rule="evenodd" />
                </svg>
                </button>
                <button title="Like" class="like">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                    class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                </svg>
            </button>
                <button title="Dislike" class="dislike">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                    class="w-6 h-6"> 
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
                </svg>
            </button>
            
            `;

        assistDiv.appendChild(panel);
        // console.log("assist1", (parent.parentElement.parentElement));
        const messageTxt = assistDiv.parentElement.parentElement;
        messageTxt.addEventListener("focus", () => {
            panel.style.display = "flex";
            console.log("focus");
            messageTxt.classList.add("focused");
        });

        // Add event listeners for mouse enter and leave
        messageTxt.addEventListener("mouseenter", () => {
            panel.style.display = "flex";
            console.log("mouseEnter");
            messageTxt.classList.add("focused");
        });

        messageTxt.addEventListener("blur", () => {
            setTimeout(() => {
                panel.style.display = "none";
                messageTxt.classList.remove("focused");
            }, 50);
        });

        messageTxt.addEventListener("mouseleave", () => {
            if (!messageTxt.contains(document.activeElement)) {
                panel.style.display = "none";
                messageTxt.classList.remove("focused");
            } else {
                console.log("ML");
            }
        });
        panel.querySelector(".speak").addEventListener("click", () => {
            var text = messageDiv.querySelector(".text").innerText;
            convertTextToSpeech(text);
        });
        panel.querySelector(".copy_btn").addEventListener("click", () => {
            const clone = messageDiv.cloneNode(true);
            // const textWithLinks = convertLinks(clone);
            const textWithLinks = convertLinks(messageDiv);
            const textToCopy = textWithLinks.querySelector(".text").innerText;
            navigator.clipboard
                .writeText(textToCopy)
                .then(() => {
                    console.log("Text copied...:", textToCopy);
                })
                .catch(err => {
                    console.error("Failed to copy text: ", err);
                });
        });
        panel.querySelector(".regenerate").addEventListener("click", event => {
            const sourceElement = event.currentTarget.closest(".messages-span");
            console.log('td', sourceElement.querySelector(".message").getAttribute('data-response-index'))
            targetElement = sourceElement.querySelector(".text");
            let prevMessageElement =
                targetElement.closest(".messages-span").previousElementSibling;
            var existingText;
            sourceElement.style.marginTop = "0rem";
            if (
                prevMessageElement &&
                !prevMessageElement.classList.contains(".message-personal")
            ) {
                existingText =
                    prevMessageElement.querySelector(".text").textContent;
            }

            if (!generating) {
                clearTimeout(typingAnimation);
                console.log("Regenerating", existingText);
                // Function to generate a new response (replace this with your actual logic)
                // Generate a new response (this is a placeholder, replace with actual response generation logic)
                //let response = '';
                let responseText = "";
                let prompt = { prompt: existingText };
                if (messagesContainer.querySelector(".error-message")) {
                    messagesContainer.querySelector(".error-message").remove();
                }
                simulatedFetch("/getResponse", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(prompt)
                })
                    .then(data => {
                        suggestionClass.innerHTML = "";
                        if (kk.classList.contains("error")) {
                            kk.classList.remove("error");
                        }
                        return data.json();
                    })
                    .then(data => {
                        let newResponse = data["response"]; //const responseText = data.response;
                        console.log("REsponse", responseText);
                        // Update the current textObj with the new response
                        let newTextObj = messageObj.message.find(
                            msg => msg.text === existingText
                        );
                        newTextObj.responses.push(newResponse);
                        //sourceElement.querySelector('.right').click()
                        addNavigableResponse(
                            "MKSU-VA",
                            newTextObj.responses,
                            false,
                            messageObj,
                            sourceElement,
                            true
                        );

                        fetchedSug = data["suggestions"];
                        // Update suggestions
                        suggestionClass.innerHTML = "";
                        addSuggestions(fetchedSug);
                        // Clear the input field
                        messageInput.value = "";
                        sourceElement.querySelector('.nav-info').textContent = `Response ${currentResponseIndex + 1} of ${textObj.responses.length}, Text ${currentTextIndex + 1} of ${messageObj.message.length}`;
                        sourceElement.querySelector('.right').setAttribute('data-current-text-index', currentTextIndex);
                        sourceElement.querySelector('.left').setAttribute('data-current-response-index', currentResponseIndex);
                    })
                    .catch(error => {
                        generating = false;
                        console.log("Error fetching response!!", error);
                        suggestionClass.innerHTML = "";
                        kk.innerText = "Error fetching suggestions!!";
                        kk.style.color = "#ee5855";
                        console.log("Error fetching suggestions!!", error);
                        const errorMessage = document.createElement("div");
                        errorMessage.className = "error-message";
                        errorMessage.innerHTML = `
                        <span>
                            <p class="error-text"></p>
                            <button class="retry">Retry</button>
                        </span>
                        `;
                        messagesContainer.insertAdjacentElement(
                            "beforeend",
                            errorMessage
                        );
                        const retryBtn = errorMessage.querySelector(".retry");
                        const errorTxt = errorMessage.querySelector(".error-text");
                        errorTxt.innerText =
                            "Error:\n An error occurred  while generating response!!  Please check your connection and tap to retry. If this persists please contact the administrator...";
                        console.log(error.message)
                        retryBtn.addEventListener("click", function (e) {
                            clearTimeout(typingAnimation);
                            panel.querySelector(".regenerate").click();
                        });
                        messagesContainer.scrollTop =
                            messagesContainer.scrollHeight;
                        stopLoader();
                    });

                console.log(messages);
            } else {
                kk.style.color = '#ee5855'
                kk.innerText = 'Please wait for the current generation to end...'
                setTimeout(() => {
                    kk.style.color = 'var(--text-color)'
                    kk.innerText = "Suggested Prompts:";
                }, 2000)
                return;
            }
        });

        panel.querySelector(".like").addEventListener("click", () => {
            console.log("Liking");
        });

        panel.querySelector(".dislike").addEventListener("click", () => {
            console.log("disLiking");
        });
    }
}
function convertTextToSpeech(text) {
    function onEnd() {
        animateSpeech(false);
    }
    if (window.speechSynthesis) {
        try {
            console.log("speaking", text);
            // Set the text that will be spoken
            speech.text = text;
            speech.addEventListener('end', onEnd);
            // Speak the text
            window.speechSynthesis.speak(speech);
            animateSpeech(true);
            function animateSpeech(should) {
                if (isSpeaking) {
                    const bars = messagesContainer.querySelectorAll(".bar");
                    bars.forEach((bar, index) => {
                        setTimeout(() => {
                            bar.style.animation = should ? "floating .7s ease-in-out infinite" : "none";
                            //console.log(`${((index + 1) * 0.2)}`.toString())
                            //bar.style.animationDelay = ((index + 1) * 0.2).toString();
                            //bar.style.animationDelay = `${((index + 1) * 0.2)}`.toString();
                        }, ((index + 1) * 200))
                    });
                } else {
                    return
                }
            }
        } catch (error) {
            console.log("An error occurred!!");
        }
    } else {
        console.log('Sorry!! Your browser does not support speech synthesis!!')
    }
}

function getNavigationInfoText(messageObj, textIndex, responseIndex) {
    return `Response ${responseIndex + 1} of ${messageObj.message[textIndex].responses.length
        }, Text ${textIndex + 1} of ${messageObj.message.length}`;
}

function createMessageDiv(isPersonal, text, sender, avatarPath, textIndex, responseIndex) {
    /*const messageDiv = createMessageDiv(isPersonal, responses[0], sender, "./static/icon.PNG", 0, 0);*/
    const messageDiv = document.createElement("div");
    messageDiv.className = "message" + (isPersonal ? " message-personal" : "");
    isPersonal ? messageDiv.dataset.textIndex = textIndex : messageDiv.dataset.responseIndex = responseIndex;
    messageDiv.setAttribute('tabindex', '0'); // Make it focusable for keyboard events
    const avatarHtml = `
        <figure class="avatar">
            <img src="${avatarPath}" alt="${sender}">
        </figure>`;
    const timestampHtml = `<div class="timestamp"><span class="assist"><p>${sender}</p></span><p class="time">${getCurrentTime()}</p></div>`;
    const messageTextHtml = `
        <div class="message-text" tabindex="0">
            <div class="text">${text}</div>
            ${timestampHtml}
        </div>`;
    messageDiv.innerHTML = isPersonal ? messageTextHtml + avatarHtml : avatarHtml + messageTextHtml;
    return messageDiv;
}

