
    function atomiApplyParams({inputUrl}) {
      try {
        console.log(inputUrl)
        const inputUrlObj = new URL(inputUrl, window.location.origin);
        const currentPageParams = new URLSearchParams(window.location.search);
        const inputUrlParams = new URLSearchParams(inputUrlObj.search);
      
        // Iterate over all parameters in the current page's URL
        for (const [key, value] of currentPageParams) {
          // If the input URL does not already contain the parameter, add it
          if (!inputUrlParams.has(key)) {
            inputUrlParams.append(key, value);
          }
        }
      
        // Construct the final URL
        const finalUrl = inputUrlObj.origin + inputUrlObj.pathname + '?' + inputUrlParams.toString();
        console.log(finalUrl)
        return finalUrl;
      } catch (error) {
        console.log(error);
      }
    }

    function atomiFormatDate(options = { slated: false, addDate: 0 }) {
      try {
        const defaultOptions = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };

        const today = new Date();

        if (options.slated) {
          const slatedDate = new Date(today);
          slatedDate.setDate(slatedDate.getDate() + (options.addDate || 0));

          const day = slatedDate.getDate().toString().padStart(2, "0");
          const month = (slatedDate.getMonth() + 1).toString().padStart(2, "0");
          const year = slatedDate.getFullYear();
          return `${day}/${month}/${year}`;
        }

        if(options.addDate){
          today.setDate(today.getDate()+options.addDate)
        }
        const formattedDate = today.toLocaleDateString(undefined, defaultOptions);

        return formattedDate;
      } catch (error) {
        console.log(error);
      }
    };

    function atomiFormatTime() {
      try {
        const now = new Date();
        return now.toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });
      } catch (error) {
        console.log(error);
      }
    };
    function runDelayedFunctions(data) {
      try {
        document.querySelectorAll('.atomicat-delay').forEach(el => el.classList.remove('atomicat-delay'));
        if(data?.setDisplayed){
          localStorage.setItem(data?.setDisplayed, true);
        }
        
      } catch (error) {
        console.log(error);
      }
    }
  
    (function() {

    try {
        const modalList = [];
        const modalCont = [{"contKey":"1f86fd51-9c97-444c-9510-127c6a098459","modalMisc":{"isGlobal":true}}]
        const globalTriggers = document.querySelectorAll(".atomicat-global-modal-trigger");
        const globalClose = document.querySelector(".atomicat-global-modal-close");
        const modalOverlay = document.querySelector(".atomicat-modal-overlay");
        const allModals = document.querySelectorAll(".atomicat-modal");

        modalOverlay?.addEventListener("click", function() {
            modalOverlay?.classList.toggle("atomicat-modal-active");
            allModals.forEach((modal) => {
                modal.classList.remove("atomicat-modal-active");
            });
        });

        globalClose?.addEventListener("click", function() {
            document.querySelector(".atomicat-global-modal-container").classList.toggle("atomicat-modal-active");  
            modalOverlay?.classList.toggle("atomicat-modal-active");
        });

        globalTriggers.forEach((trigger) => {
            trigger.addEventListener("click", function() {
              document.querySelector(".atomicat-global-modal-container").classList.toggle("atomicat-modal-active");
              modalOverlay?.classList.toggle("atomicat-modal-active");
            });
        });

        modalCont.forEach((modal) => {
          const contKey = modal?.contKey?.slice(0, 7);
          const { modalMisc } = modal;
          const { onMouseLeave, showAfterDelay, scrollY } = modalMisc;
          const triggerCont = () => {
            const contEle = document.querySelector(`.atomicat-container-${contKey}`)
            contEle?.classList?.add("atomicat-modal-active");
            modalOverlay?.classList.add("atomicat-modal-active");
          }
            if(onMouseLeave?.active) {
              let once = false;

              document.addEventListener('mouseout', function (e) {
                if (!e?.relatedTarget && e?.clientY <= 0) {
                  if(!once) {
                    triggerCont();
                    once = onMouseLeave?.apply === "always" ? false : true;
                  }
                }
              });
            }
            if(showAfterDelay?.active && showAfterDelay?.value) {
              const { showAfterDelay } = modalMisc;
              setTimeout(() => {
                triggerCont();
              }, showAfterDelay?.value * 1000 )
            }

            if(scrollY?.active && scrollY?.value) {
              let once = false;
              const body = document.body;
              const html = document.documentElement;
              const pageHeight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
              const calcScrollY = (scrollY?.value / 100) * pageHeight;
               
              window.addEventListener("scroll", () => {
                  if (window.scrollY > calcScrollY && !once) {
                    triggerCont();
                    once = scrollY?.apply === "always" ? false : true;
                  }
              });
            }
            
        });

        allModals.forEach((modal) => {
            modal?.addEventListener('click', function(e) {
            
            if (
                          (typeof e?.target?.className === "string" &&
                            (e?.target?.className?.includes("atomicat-modal") ||
                              e?.target?.className?.includes(
                                "atomicat-modal-outer-container"
                              ) ||
                              e?.target?.className?.includes(
                                "atomicat-modal-inner-container"
                              ))) ||
                          e?.target?.className?.includes?.(
                            "atomicat-inner-container"
                          ) 
                        ) {
              const globalModal = document.querySelector('.atomicat-modal');
              const globalModalOverlay = document.querySelector('.atomicat-modal-overlay');
              modal.classList.remove('atomicat-modal-active');
              if(globalModal) {
                globalModal.classList.remove('atomicat-modal-active');
                globalModalOverlay.classList.remove('atomicat-modal-active');
              }
            }
          });
        });

        modalList.forEach((modal) => {
            const modalID = modal.misc.modal.customModalID?.slice(0, 7);
            const modalKey = modal.compKey?.slice(0, 7);
            const modalElement = document.querySelector(".atomicat-modal-trigger-" + modalKey);
            const closeModal = document.querySelector(".atomicat-modal-close-" + modalID);

            closeModal?.addEventListener("click", function() {
              document.querySelector(".atomicat-container-" + modalID).classList.remove("atomicat-modal-active");
              modalOverlay?.classList.remove("atomicat-modal-active");   
            });

            modalElement?.addEventListener("click", function() {
              document.querySelector(".atomicat-container-" + modalID).classList.toggle("atomicat-modal-active");
               modalOverlay?.classList.toggle("atomicat-modal-active");
            });
        })
    } catch (error) {
        console.log(error);
    }
    })();(function() {
          try {
              const clickeventList = [{"compKey":"f405e4c8-a934-48d4-b81a-0cd35d397e62","misc":{"type":"button"}},{"compKey":"c96ae684-bf5c-497a-b1b9-4b596d63a9dc","misc":{"type":"button"}},{"compKey":"4402657e-9951-4615-919a-fdeade62049b","misc":{"type":"button"}},{"compKey":"0d9e2a9b-ecb2-4c9d-b91f-230a3bd400d6","misc":{"type":"button"}}];
    
    
              clickeventList.forEach((comp, index) => {
                  const compKey = comp?.compKey?.slice(0, 7);
                  const eleType = comp?.misc?.type;
                  const showItemsById = comp?.misc?.showItemsById;
                  const hideAfterClick = comp?.misc?.hideAfterClick;
                  const hideOnComplete = comp?.misc?.hideOnComplete;
                  console.log(comp, "clickevent")
                  if(hideAfterClick) {
                    const hideAfterClickEle = document.querySelector(`.atomicat-hide-after-click-${compKey}`);
                    console.log(hideAfterClickEle, "hideAfterClickEle")
                    if (hideAfterClickEle) {
                      hideAfterClickEle.addEventListener("click", function() {
                          console.log("hideAfterClickEle clicked")
                          hideAfterClickEle.classList.add("atomicat-hidden");
                      })
                    }
                  }
                  if(hideOnComplete) {
                    const hideOnCompleteEle = document.querySelector(`.atomicat-hide-on-complete-${compKey}`);
                    console.log(hideOnCompleteEle, "hideOnCompleteEle")
                    if (hideOnCompleteEle) {
                      hideOnCompleteEle.addEventListener("animationend", function() {
                          console.log("hideOnCompleteEle animationend")
                          hideOnCompleteEle.classList.add("atomicat-hidden");
                      })
                    }
                  }
                  if(showItemsById) {
                    const showItemsByIdEle = document.querySelector(`.atomicat-show-hidden-item-${compKey}`);
                    if(eleType === "progressbar"){
                      showItemsByIdEle.addEventListener("animationend", function() {
                        console.log("animation end")
                        atomiShowItems()
                      })
                    } else{
                      showItemsByIdEle.addEventListener("click", function() {
                        console.log("showItemsByIdEle click")
                        atomiShowItems()
                      })
                    }
                    function atomiShowItems() {
                      showItemsById.forEach((item) => {
                        const hiddenItem = document.querySelector(`#${item}`) || document.querySelector(`.${item}`);
                        if (hiddenItem) {
                          hiddenItem.classList.remove("atomicat-delay");
                        }
                      })
                    }
                  }
              });
    
          } catch (error) {
              console.log(error);
          }
      })();
    (function() {
      try {
        const toggleButtons = document.querySelectorAll('.atomicat-menu-toggle');
        toggleButtons.forEach(button => {
          button.addEventListener('click', function() {
            console.log("clicked...")
            const navContainer = button.closest('.atomicat-nav-container');
            console.log(navContainer)
            if(navContainer) {
              navContainer.classList.add('atomicat-menu-open');
              navContainer.classList.remove('atomicat-menu-closing');
            }
          });
        });
        const closeButtons = document.querySelectorAll('.atomicat-drawer-close');
        closeButtons.forEach(button => {
          button.addEventListener('click', function() {
            const navContainer = button.closest('.atomicat-nav-container');
            if(navContainer) {
              navContainer.classList.add('atomicat-menu-closing');
              setTimeout(() => {
                navContainer.classList.remove('atomicat-menu-open');
              }, 500);
            }
          });
        });
      } catch (error) {
        console.log(error);
      }
    })();
      
    function atomiLoadSwiperCDN() {
      return new Promise((resolve, reject) => {
        if (!window.Swiper) {
          // Add CSS
          const cssLink = document.createElement('link');
          cssLink.rel = 'stylesheet';
          cssLink.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
          cssLink.onload = () => console.log('Swiper CSS loaded');
          document.head.appendChild(cssLink);

          // Add JS
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
          script.onload = () => {
            console.log('Swiper JS loaded');
            resolve();
          };
          script.onerror = () => reject(new Error('Failed to load Swiper JS'));
          document.head.appendChild(script);
        } else {
          resolve();
        }
      });
    }
  
      
      (function() {
        try {
          const atomi_slider4a846de_ele = document.querySelector(".atomicat-slider-4a846de")
          const atomi_slider4a846de_observer = new IntersectionObserver(async (entries) => {
            entries.forEach(async (entry) => {
              console.log(entry)
              if (entry.isIntersecting) {
                try {
                  if(!document.querySelector(".swiper-4a846de").classList.contains("swiper-initialized")){
                    console.log("load swiper 4a846de")
                    await atomiLoadSwiperCDN();
                    
      try {
        if (!window.swipers) {
          window.swipers = {};
        }
        if (window.swipers['4a846de']) {
          window.swipers['4a846de'].destroy(true, true);
        }
        window.swipers['4a846de'] = new Swiper('.swiper-4a846de', {
          loop: true,
          autoplay: { delay: 2000, pauseOnMouseEnter: false },
          speed: 300,
          spaceBetween: 10,
          direction: 'horizontal',
          navigation: {
            nextEl: '.swiper-4a846de .swiper-button-next',
            prevEl: '.swiper-4a846de .swiper-button-prev',
          },
          pagination: {
            el: '.swiper-4a846de .swiper-pagination',
            clickable: true,
          },
          slidesPerView: 1,
          slidesPerGroup: 1,
          breakpoints: {
            300: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 10,
            },
          },
        });
      } catch (error) {
        console.log("swiper init error....");
        console.log(error);
      }
    
                    document.querySelector(".swiper-4a846de").classList.remove("atomicat-hidden")
                  }
                } catch (error) {
                  console.error('Error initializing Swiper:', error);
                }
                atomi_slider4a846de_observer.disconnect(); // Stop observing after initialization
              }
            });
          });

          atomi_slider4a846de_observer.observe(atomi_slider4a846de_ele);
        } catch (error) {
          console.log(error);
        }
      })();
      

      (function() {
        try {
          const atomi_sliderf82272d_ele = document.querySelector(".atomicat-slider-f82272d")
          const atomi_sliderf82272d_observer = new IntersectionObserver(async (entries) => {
            entries.forEach(async (entry) => {
              console.log(entry)
              if (entry.isIntersecting) {
                try {
                  if(!document.querySelector(".swiper-f82272d").classList.contains("swiper-initialized")){
                    console.log("load swiper f82272d")
                    await atomiLoadSwiperCDN();
                    
      try {
        if (!window.swipers) {
          window.swipers = {};
        }
        if (window.swipers['f82272d']) {
          window.swipers['f82272d'].destroy(true, true);
        }
        window.swipers['f82272d'] = new Swiper('.swiper-f82272d', {
          loop: true,
          autoplay: { delay: 2000, pauseOnMouseEnter: false },
          speed: 300,
          spaceBetween: 10,
          direction: 'horizontal',
          navigation: {
            nextEl: '.swiper-f82272d .swiper-button-next',
            prevEl: '.swiper-f82272d .swiper-button-prev',
          },
          pagination: {
            el: '.swiper-f82272d .swiper-pagination',
            clickable: true,
          },
          slidesPerView: 2,
          slidesPerGroup: 1,
          breakpoints: {
            300: {
              slidesPerView: 2,
              slidesPerGroup: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              slidesPerGroup: 1,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 2,
              slidesPerGroup: 1,
              spaceBetween: 10,
            },
          },
        });
      } catch (error) {
        console.log("swiper init error....");
        console.log(error);
      }
    
                    document.querySelector(".swiper-f82272d").classList.remove("atomicat-hidden")
                  }
                } catch (error) {
                  console.error('Error initializing Swiper:', error);
                }
                atomi_sliderf82272d_observer.disconnect(); // Stop observing after initialization
              }
            });
          });

          atomi_sliderf82272d_observer.observe(atomi_sliderf82272d_ele);
        } catch (error) {
          console.log(error);
        }
      })();
      
    