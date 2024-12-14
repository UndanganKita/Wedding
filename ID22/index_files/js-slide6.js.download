var splide;
        var tickAuto;
        var canSliding = true;
        var onSwipe = false;
        var alreadyReload = false;
        $(document).ready(function () {





            // setTimeout(function() {
            //     loadUcapan();
            // }, 3000);



            splide = new Splide( '.splide-menu', {
                // type   : 'loop',
                perPage: 5,
                focus  : 'center',
                pagination : false,
                arrows     : false,
            });

            splide.mount();

            splide.on('click', function (event) {
                var slideIndex = event.index;
                translate = slideIndex*-100;
                // Move to the clicked slide with centered focus
                // console.log('slide index:'+slideIndex);
                slideTo(slideIndex*-100);
                splide.go(slideIndex);
                clearInterval(tickAuto);
                tickAuto = window.setInterval(ticker, 8000);
            });

            splide.on('active', function (event) {
                var slideIndex = event.index;
                var slideComponent = event.slide;
                // slideComponent.style.backgroundColor = 'red';
                var tagP = slideComponent.querySelector('p');
                // console.log(tagP)
                tagP.style.color = '#000';
                tagP.style.fontSize = '13px';
                // console.log("Atribut ID: "+tagP.getAttribute('id'));
                doAnimation(tagP.getAttribute('id'));
            });

            splide.on('inactive', function (event) {
                var slideIndex = event.index;
                var slideComponent = event.slide;
                // slideComponent.style.backgroundColor = 'white';
                var tagP = slideComponent.querySelector('p');
                tagP.style.color = '#828282';
                tagP.style.fontSize = '11px';
            });


            // Set isDragging to false when dragging ends
            splide.on('dragged', function () {
                draggedIndex = splide.index;
                // console.log('Currently dragged index:', draggedIndex);
                slideTo(draggedIndex*-100);
                clearInterval(tickAuto);
                tickAuto = window.setInterval(ticker, 8000);

                setTimeout(function () {
                    canSliding = true;
                }, 500);
            });

            splide.on('dragging', function () {
                canSliding = false;
                // console.log('on draging');
            });

        });

        // lightGallery(document.getElementById('lightgallery'), {
        //     plugins: [lgZoom, lgThumbnail],
        //     speed: 500,
        //     // dynamic: true,
        //     // download: true,
        // });

        $('#galleryGrid').justifiedGallery({
            rowHeight: 180,
            lastRow: 'nojustify',
            margins: 3
        });


        $("#music_1").click(function () {
            var bool = $("#playAudio").prop("muted");
            $("#playAudio").prop("muted", !bool);
            $("#playAudioS").prop("muted", !bool);
        })


        var ticker = function () {
            if (autoPilot) {
                if (translate > maxTranslate) {
                    slide('next')
                } else {
                    slideTo(0)
                    splide.go(0);
                }
            }

        }

        var autoPilot = true;
        const pages = document.querySelectorAll(".page1");
        const translateAmount = 100;
        var numItems = $('.page1').length
        const maxTranslate = (-100 * numItems) + 100;
        let translate = 0;
        slide = (direction) => {
            startAnimHide()
            setTimeout(function () {
                direction === "next" ? translate -= translateAmount : translate += translateAmount;
                pages.forEach(page => {
                    page.style.transform = `translateY(${translate}%)`;
                    slideIndex = translate / 100*-1;
                    splide.go(slideIndex);
                    // console.log('translate:'+translate+'- index:'+slideIndex);
                });
                doAnimation(slideIndex)
                clearInterval(tickAuto);
                tickAuto = window.setInterval(ticker, 8000);
            }, 800);
        }

        slideTo = (topage) => {

            startAnimHide()
            setTimeout(function () {
                translate = topage
                pages.forEach(
                    pages => (pages.style.transform = `translateY(${translate}%)`)
                );
                slideIndex = translate / 100*-1;
                doAnimation(slideIndex);
                clearInterval(tickAuto);
                tickAuto = window.setInterval(ticker, 8000);
            }, 800);
        }




        function goToSlideId(slideClassId) {
            var slideElement = document.querySelector('.'+slideClassId);
            var slideElId = slideElement.id;
            if (slideElement) {
                var indexSlide = slideElId.slice(-2);
                splide.go(indexSlide-1);
                slideTo((indexSlide-1)*-100);
            }
        }


        // close modal
        $('.ucapan-slide-close').on('click', function () {
            closeEditModal('ucapan-slide');
        })



        let touchstartX = 0
        let touchendX = 0

        function checkDirection() {
            var selisih = touchstartX-touchendX;
            if (selisih < 0) {
                selisih = selisih*-1;
            }
            // console.log('Slisih sliding: '+selisih);
            if (selisih < 80) {
                return false;
            }

            onSwipe = true;
            setTimeout(function () {
                onSwipe = false;
            }, 1000);

            if (canSliding) {
                if (touchendX < touchstartX) {
                    // alert('swiped left!')
                    // console.log('to LEFT');
                    if (translate > maxTranslate) {

                        if (autoPilot == false) {
                            slide('next')
                        } else {
                            showNotifScroll()
                        }
                    } else {
                        slideTo(0)
                        splide.go(0);
                    }
                    $('#tutorial-swipe').hide();

                }
                if (touchendX > touchstartX) {
                    // alert('swiped right!')
                    // console.log('to RIGHT');
                    if (translate < 0) {
                        if (autoPilot == false) {
                            slide('previous')
                        } else {
                            showNotifScroll()
                        }

                    }
                    $('#tutorial-swipe').hide();
                }
            }
        }


        var allPages = document.querySelector('.pages1');
        allPages.addEventListener('touchstart', e => {
            touchstartX = e.changedTouches[0].screenY
        })

        allPages.addEventListener('touchend', e => {
            touchendX = e.changedTouches[0].screenY
            // if (autoPilot == false) {
                checkDirection()
            // }

        })

        function showNotifScroll() {
            if ($('#notif-scroll').length == 0) {
                $('#splide').before('<div id="notif-scroll" style="bottom: 70px;opacity:0;background-color: #292929;position: fixed;right: 80px;font-size: 10px;padding: 5px;border-radius: 5px;color: #fff;">Matikan fitur auto scroll untuk melakukan manual scroll 👉</div>');
                anime({
                    targets: '#notif-scroll',
                    translateX: 20,
                    opacity: 1,
                    duration: 800,
                    easing: 'easeInOutQuad'
                });
                setTimeout(function() {
                    $('#notif-scroll').remove();
                }, 5000);
            }
        }

        function showMusic() {
            $("#menu-music-cont").toggle();
        }


        function runAutoScroll() {
            tickAuto = window.setInterval(ticker, 8000);
        }


        $('#auto_scroll1').on('click', function (e) {
            e.preventDefault();
            if (autoPilot) {
                $('#menu_auto_scroll').css('background-color', '#4970ea');
                autoPilot = false;
                $('#notif_scroll1').hide();
                $('#tutorial-swipe').show();
            } else {
                autoPilot = true;
                $('#menu_auto_scroll').css('background-color', 'transparent');
                $('#notif_scroll1').show();
                $('#tutorial-swipe').hide();
            }
        });


        function startAnimHide() {
            // return true;
            $('.pojok-kiri-atas1').removeClass('goyang-1')
            $('.kanan-bawah').removeClass('goyang-12')
            // $('.pojok-kiri-atas1').css('transform', 'translateY(129px)')

            // animate atas
            anime({
                targets: '.pojok-kiri-atas1',
                translateY: -180,
                opacity: 0,
                easing: 'easeInOutQuad',
                duration: 500,
            });

            setTimeout(function () {
                anime({
                    targets: '.pojok-kiri-atas1',
                    translateY: 0,
                    opacity: 1,
                    duration: 2000,
                    easing: 'easeInOutQuad'
                });
            }, 2000);

            setTimeout(function () {
                $('.pojok-kiri-atas1').addClass('goyang-1')
            }, 2500);
            // end animate atas


            // animate bawah
            anime({
                targets: '.kanan-bawah',
                translateY: 170,
                opacity: 0,
                easing: 'easeInOutQuad',
                duration: 500,
            });

            setTimeout(function () {
                anime({
                    targets: '.kanan-bawah',
                    translateY: 0,
                    opacity: 1,
                    duration: 2000,
                    easing: 'easeInOutQuad'
                });
            }, 2000);

            setTimeout(function () {
                $('.kanan-bawah').addClass('goyang-12')
            }, 2500);
            // end animate bawah


            // animate tengah
            anime({
                targets: '.tengah-atas',
                translateY: 170,
                opacity: 0,
                easing: 'easeInOutQuad',
                duration: 800,
            });

            setTimeout(function () {
                anime({
                    targets: '.tengah-atas',
                    translateY: 0,
                    opacity: 1,
                    duration: 1300,
                    easing: 'easeInOutQuad'
                });
            }, 2000);

            anime({
                targets: '.tengah-bawah',
                translateY: -170,
                opacity: 0,
                easing: 'easeInOutQuad',
                duration: 800,
            });

            setTimeout(function () {
                anime({
                    targets: '.tengah-bawah',
                    translateY: 0,
                    opacity: 1,
                    duration: 1300,
                    easing: 'easeInOutQuad'
                });
            }, 2000);
            // end animate tengah


            // animate kiri-kanan
            anime({
                targets: '.tengah-kiri',
                translateX: -170,
                opacity: 0,
                easing: 'easeInOutQuad',
                duration: 800,
            });

            setTimeout(function () {
                anime({
                    targets: '.tengah-kiri',
                    translateX: 0,
                    opacity: 1,
                    duration: 1300,
                    easing: 'easeInOutQuad'
                });
            }, 2000);

            anime({
                targets: '.tengah-kanan',
                translateX: 170,
                opacity: 0,
                easing: 'easeInOutQuad',
                duration: 800,
            });

            setTimeout(function () {
                anime({
                    targets: '.tengah-kanan',
                    translateX: 0,
                    opacity: 1,
                    duration: 1300,
                    easing: 'easeInOutQuad'
                });
            }, 2000);
            // end animate kiri kanan

            // zoom
            anime({
                targets: '.tengah-zoom',
                scaleX: 0, // Scale factor for X axis
                scaleY: 0, // Scale factor for Y axis
                opacity: 0,
                easing: 'easeInOutQuad',
                duration: 800,
            });

            setTimeout(function () {
                anime({
                    targets: '.tengah-zoom',
                    scaleX: 1, // Scale factor for X axis
                    scaleY: 1, // Scale factor for Y axis
                    opacity: 1,
                    duration: 1300,
                    easing: 'easeInOutQuad'
                });
            }, 2000);

            // end zoom

        }


        function kembali() {
            // console.log('ISI FN KEMBALI');
        }





        // start on click
        var opened = false;
        $(".awal1").on("click", function () {
            if (!opened) {
                opened = true;
                // console.log('open undangan');
                let param = searchParams.get('kpd');
                $('#konfir_nama').val(param);
                $("#playAudio").get(0).play();
                $("#playAudioS").get(0).play(); //play musik
                runAutoScroll()
                slide('next')
                $('#buka-undangan').hide()
                toggleFullScreen(document.body)
                $('#menu_btn_1').show()
                $('#img-kado-buka').show();
                $('#btn_open').hide();
            }
        });


        function toggleFullScreen(elem) {
            // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
            if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document
                    .msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document
                    .mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !==
                    undefined && !document.webkitIsFullScreen)) {
                if (elem.requestFullScreen) {
                    elem.requestFullScreen();
                } else if (elem.mozRequestFullScreen) {
                    elem.mozRequestFullScreen();
                } else if (elem.webkitRequestFullScreen) {
                    elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                } else if (elem.msRequestFullscreen) {
                    elem.msRequestFullscreen();
                }
            } else {
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
}
        
function next() {    
    splide.go('>');    
    translate = Math.max(translate - translateAmount, maxTranslate);
    pages.forEach(page => {
        page.style.transform = `translateY(${translate}%)`;
    });    
    clearInterval(tickAuto);
    // tickAuto = window.setInterval(ticker, 8000);
}

function prev() {    
    splide.go('<');    
    translate = Math.min(translate + translateAmount, 0);
    pages.forEach(page => {
        page.style.transform = `translateY(${translate}%)`;
    });    
    clearInterval(tickAuto);
    // tickAuto = window.setInterval(ticker, 8000);
}

