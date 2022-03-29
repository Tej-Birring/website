import {gsap} from "gsap";


// observer is work in progress!
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(
            (entry)=>{
                // console.debug(entry.isIntersecting)
                if (entry.intersectionRatio > 0) {
                    const el = entry.target;
                    // get configs to print
                    const cfgs = el?.animationConfigs;
                    if (!cfgs) return;
                    console.debug("Applying animation: " + JSON.stringify(cfgs));
                    // apply animation
                    if (el instanceof HTMLImageElement) {
                        el.addEventListener("load", ()=>{
                            el?.anim?.play();
                            observer.unobserve(el);
                        });
                    } else {
                        el?.anim?.play();
                        observer.unobserve(el);
                    }
                }
            });
    },
    {
        root: null, //document.getElementById("#app"),
        rootMargin: "0px 0px 5.5% 0px",
        threshold: 0
    }
);


const _animationTypes = {
    fadeIn: (el, duration, delay, ease) => {
      el.anim = gsap.from(el, {
          opacity: 0,
          duration,
          delay,
          ease,
          paused: true
      });
    },
    fadeInLeft: (el, duration, delay, ease) => {
        el.anim = gsap.from(el, {
            opacity: 0,
            translateX: -50,
            transformOrigin: "left",
            duration,
            delay,
            ease,
            paused: true
        })
    },
    fadeInRight: (el, duration, delay, ease) => {
        el.anim = gsap.from(el, {
            opacity: 0,
            translateX: 50,
            transformOrigin: "right",
            duration,
            delay,
            ease,
            paused: true
        })
    },
    fadeInTop: (el, duration, delay, ease) => {
        el.anim = gsap.from(el, {
            opacity: 0,
            translateY: -50,
            transformOrigin: "top",
            duration,
            delay,
            ease,
            paused: true
        })
    },
    fadeInBottom: (el, duration, delay, ease) => {
        el.anim = gsap.from(el, {
            opacity: 0,
            translateY: 50,
            transformOrigin: "bottom",
            duration,
            delay,
            ease,
            paused: true
        })
    },
    accordion: (el, duration, delay, ease) => {
        el.style.overflow = "hidden";
        el.style.height = 0;
        el.style.opacity = 0;
        el.anim = gsap.to(el, {
            height: "auto",
            opacity: 1,
            duration,
            delay,
            ease,
            paused: true
        })
    }
};


function _checkIfAnimationType(arg) {
    return Object.keys(_animationTypes).includes(arg);
}


function _checkIfDuration(arg) {
    return Object.keys(_options).includes(arg);
}


const _options = {
    vvLong: 2.584,
    vlong: 1.597,
    long: 0.987,
    reg: 0.610,
    short: 0.377,
    vShort: 0.233,
    vvShort: 0.144
};


const directiveAnimate = {
    created (el, binding, vueNode, prevVueNode) {
        const {value=undefined, modifiers=undefined, arg=undefined} = binding;
        const modifiersArr = Object.keys(modifiers);

        if (!arg) {
            console.log("Ignoring animation, no arg specified.");
            return;
        }
        if (!_checkIfAnimationType(arg)) {
            console.log("Ignoring animation, invalid arg specified.");
            return;
        }
        const animationType = arg;
        const delay = value?.delay ? value?.delay/1000 : 0; //
        const ease = value?.ease ?? "power1.inOut";
        let duration = _options["reg"];
        if (_checkIfDuration(modifiersArr?.[0])) {
            duration = _options[modifiersArr?.[0]];
        }
        const inView = modifiersArr.includes("inView");

        // set configs
        const cfgs = {
            animationType,
            duration,
            delay,
            ease,
            display: el.style.display,
            animateOnMount: !inView
        };
        el.animationConfigs = cfgs;
        // add animation to el — *.anim;
        _animationTypes[cfgs.animationType](el, cfgs.duration, cfgs.delay, cfgs.ease);

        // apply animation trigger
        if (inView) {
            observer.observe(el);
        } else {
            el.style.display = "none";
        }
    },
    mounted(el) {
        if (!el?.animationConfigs.animateOnMount || !el?.anim) return;
        const cfgs = el.animationConfigs;
        if (el instanceof HTMLImageElement) {
            el.addEventListener("load", ()=>{
                el.style.display = cfgs.display;
                el?.anim?.play();
            })
        } else {
            el.style.display = cfgs.display;
            el?.anim?.play();
        }
    }
};



export default {
    install(app, options={}) {
        // apply options
        Object.entries(options).forEach(([key, val])=>{
            if (options?.[key] && _options?.[key]) {
                _options[key] = options[key];
            } else {
                console.debug("Animations options, invalid option: " + key);
            }
        });
        console.debug("Using animation options: " + JSON.stringify(_options));

        // install directive
        app.directive("animate", directiveAnimate);
    }
}
