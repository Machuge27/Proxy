const container = document.querySelector(".messages");
        const my_menu = document.querySelector(".myMenu");
        const close_svg1 = document.querySelector(".close-svg1");
        const svg_boxes = document.querySelector(".svg-boxes");
        const notices_page = document.querySelector(".notices-page");
        const msgs_page = document.querySelector(".msgs-page");
        const profile_page = document.querySelector(".profile-page");
        const home_page = document.querySelector(".home-page");
        const items = document.querySelectorAll(".list");
        let replySent = true;
        const loader = `<div class="loader"></div> `;
        const closeLite = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
      className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>`;
        function activeLink() {
            items.forEach(item => {
                item.classList.remove("active");
            });
            this.classList.add("active");
        }
        items.forEach(item => {
            item.addEventListener("click", activeLink);
        });

        function openMyMenu() {
            svg_boxes.classList.toggle("hidden");
            close_svg1.classList.toggle("hidden");
            my_menu.style.display = "flex";
            console.log("Fetching Notices, Messages etc");
//             container.innerHTML = `
// <h3>
// Fetching Notices, Messages etc....
// </h3> 

// `;
        }


        function addMsg(messages) {
            container.innerHTML = `
                <p>These are the user messages.</p>
              `;
            console.log(container.innerText);
        }

        // Wait for the page to finish loading
        document.addEventListener("DOMContentLoaded", () => {
        svg_boxes.addEventListener("click", openMyMenu);
        close_svg1.addEventListener("click", () => {
            svg_boxes.classList.toggle("hidden");
            close_svg1.classList.toggle("hidden");
            my_menu.style.display = "none";
            addMsg(messages);
        });
            //addMsg(messages);
            document.querySelector('.msgs').click()
        });

        function showPage(pageId) {
            let pages = document.querySelectorAll(".page");
            pages.forEach(section => {
                section.classList.toggle("active", section.id === pageId);
                if (!section.querySelector(".loader")) {
                    section.insertAdjacentHTML("afterbegin", loader);
                }
                setTimeout(() => {
                    section.querySelector(".loader").remove();
                }, 2000);
            });
        }

        // Function to delete a message
        function deleteMessage(button) {
            button.closest(".msg").remove();
        }
        // Function to mark a message read
        function markRead(button) {
            const blueTick = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" id="double-check"><path fill="#07f" fill-rule="evenodd" d="M16.5303 6.46967C16.8232 6.76256 16.8232 7.23744 16.5303 7.53033L6.53033 17.5303C6.38968 17.671 6.19891 17.75 6 17.75 5.80109 17.75 5.61032 17.671 5.46967 17.5303L1.46967 13.5303C1.17678 13.2374 1.17678 12.7626 1.46967 12.4697 1.76256 12.1768 2.23744 12.1768 2.53033 12.4697L6 15.9393 15.4697 6.46967C15.7626 6.17678 16.2374 6.17678 16.5303 6.46967zM22.5303 6.46966C22.8232 6.76254 22.8232 7.23742 22.5303 7.53032L12.5308 17.5303C12.2379 17.8232 11.7631 17.8232 11.4702 17.5304L9.96975 16.0304C9.67681 15.7376 9.67674 15.2627 9.96959 14.9697 10.2624 14.6768 10.7373 14.6767 11.0303 14.9696L12.0004 15.9394 21.4697 6.46968C21.7625 6.17678 22.2374 6.17677 22.5303 6.46966z" clip-rule="evenodd"></path></svg>`;
            button.innerHTML = blueTick;
            const ntf =
                button.parentElement.parentElement.parentElement.parentElement.querySelector(
                    ".notification"
                );

            if (ntf) {
                ntf.remove();
            }
        }
        // Function to reply to a message
        function Reply(button) {
            button.nextElementSibling.click();
            console.log(button.closest('.msg').querySelector('.sender').textContent);

        }
                function Reply(button) {
            const msgDiv = button.closest('.msg');
            //console.log(messageDiv)
            const sender = msgDiv.querySelector('.sender').textContent;
            const sendersImage = msgDiv.querySelector('.sender-picture').src;
            const messageContent = msgDiv.querySelector('p').textContent;
            const messageDate = msgDiv.querySelector('.date').textContent;
                        // Create reply container
                        const replyContainer = document.createElement('div');
                        button.nextElementSibling.click();
                        replyContainer.classList.add('reply-container');
                        replyContainer.innerHTML = `
                    <div class="replied-message row">
                        <img src="${sendersImage}" alt="Receiver">
                        <span style="border-left: 1px solid #ccc;height:3lh;overflow:auto;">
                            <p><strong>Replying to:</strong> ${sender}</p>
                            <p>${messageContent}</p>
                        </span>
                        <span class="close" style="margin:0px; color:#333; cursor:pointer;" onclick="this.parentElement.parentElement.remove(); replySent=true">${closeLite}</span>
                    </div>
                    <div class="filePreview"></div>
                    <div class="reply-input">
                        <label for="image_uploads">
                            <input class="fileInput" type="file" name="image_uploads" accept=".png, .pdf" onchange="showPreview(event)" multiple />
                            <svg xmlns="http://www.w3.org/2000/svg" onclick="document.querySelector('.fileInput').click()" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path fill="currentColor" fill-rule="evenodd"
                                    d="M9 7a5 5 0 0 1 10 0v8a7 7 0 1 1-14 0V9a1 1 0 0 1 2 0v6a5 5 0 0 0 10 0V7a3 3 0 1 0-6 0v8a1 1 0 1 0 2 0V9a1 1 0 1 1 2 0v6a3 3 0 1 1-6 0z"
                                    clip-rule="evenodd"></path>
                            </svg>
                        </label>
            
                        <textarea class='textarea1' placeholder="Enter your reply here..."></textarea>
                            <svg xmlns="http://www.w3.org/2000/svg" onclick="sendReply(this)" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                            </svg>    
                    </div>
                `;
            
                        // Append reply container next to the original message
                        if (replySent) {
                            msgDiv.insertAdjacentElement('afterend', replyContainer);
                        }
                        replySent = false;
                        document.querySelector('.textarea1').focus();
                    }
                    // Function to handle image preview
        function showPreview(event) {
            const preview = event.target.parentElement.parentElement.previousElementSibling//('.filePreview');
            console.log(preview)
            while (preview.firstChild) {
                preview.removeChild(preview.firstChild);
            }

            const curFiles = event.target.files;
            if (curFiles.length === 0) {
                const para = document.createElement("p");
                para.textContent = "No files currently selected for upload";
                preview.appendChild(para);
            } else {
                const list = document.createElement("ol");
                preview.appendChild(list);

                for (const file of curFiles) {
                    const listItem = document.createElement("li");
                    const para = document.createElement("p");
                    listItem.style.padding = '.3rem';
                    listItem.className="list";
                    para.className = 'para';
                    console.log(file.type);
                    if (validFileType(file)) {
                        para.innerHTML = `${file.name.split(" ", 1) + '...'}`;// <br> ${returnFileSize(file.size)}.`;

                        const reader = new FileReader();
                        const cl = document.createElement('span');
                        cl.innerHTML = `<span class="close" style="margin:0px; padding:0px; color:#aaa; cursor:pointer;" onclick="this.closest('.list').remove(); replySent=true">${closeLite};</span>`;
                        const imgSpan = document.createElement("span");
                        const image = document.createElement("img");
                        imgSpan.classList.add('row')
                        reader.onload = function (e) {
                            if (file.type.startsWith('image/')) {
                                image.src = e.target.result;
                                image.style.maxWidth = '100%';
                            } else if (file.type.startsWith('application/')) {
                                image.src = 'chat_app/static/chat_app/images/icon1.PNG'
                                image.style.maxHeight = '40px';
                                image.style.maxWidth = '40px';
                            }
                            image.style.display = "block";
                        };
                        reader.readAsDataURL(file);
                        imgSpan.appendChild(image);
                        imgSpan.appendChild(cl);
                        listItem.appendChild(imgSpan);
                        listItem.appendChild(para);
                    } else {
                        para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
                        listItem.appendChild(para);
                    }
                    list.appendChild(listItem);
                }
            }
        }
        const fileTypes = [
            "image/apng",
            "image/bmp",
            "image/gif",
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/svg+xml",
            "image/tiff",
            "image/webp",
            "image/x-icon",
            "application/doc",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/pdf",
            "video/mp4",
            "video/mkv",
            "audio/wav",
            "audio/acc"
        ];

        function validFileType(file) {
            return fileTypes.includes(file.type);
        }
        function returnFileSize(number) {
            if (number < 1024) {
                return `${number} bytes`;
            } else if (number >= 1024 && number < 1048576) {
                return `${(number / 1024).toFixed(1)} KB`;
            } else if (number >= 1048576) {
                return `${(number / 1048576).toFixed(1)} MB`;
            }
        }
    
        // Function to handle sending the reply
        function sendReply(button) {
            const replyDiv = button.parentElement.parentElement;
            const textArea = replyDiv.querySelector('textarea');
            const imagePreview = replyDiv.querySelector('#filePreview');


            if (textArea.value.trim() !== '' || imagePreview.src) {
                // You can handle sending the reply here
                // For now, we just remove the reply input after sending
                const x = document.createElement('div');
                const p = document.createElement('p');
                const btnSpan = document.createElement('span');
                btnSpan.innerHTML = `<span class="row jsb">
                                <span class="date" style="color: #777; padding: 0 .3rem; font-size:12px;">2024-07-28</span>
                                <span >
                                        <svg xmlns="http://www.w3.org/2000/svg" style="margin:0 .3rem;" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="delete" onclick="deleteMessage(this)" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="#f4a" class="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                </span>
                            </span>
                                    `;
                p.className = 'replied-text';
                p.textContent = textArea.value;
                x.classList.add(...["h"])
                x.appendChild(p);
                x.appendChild(btnSpan);
                textArea.parentElement.replaceWith(x);
                //alert('Reply sent with message: ' + textArea.value + (imagePreview.src ? ' and an image.' : ''));
                replySent = true;
                replyDiv.previousElementSibling.style.marginBottom = '.3rem';
                replyDiv.querySelectorAll('.close').forEach((item) => {
                    item.remove();
                });
                //replyDiv.remove();
            } else {
                alert('Please enter a reply or add an image.');
            }
        }