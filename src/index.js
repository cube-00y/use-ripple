const rippleFunction = (event) => {
    const { target } = event;
    const attr = target.getAttribute('data-ripple');

    if (!attr) {
        return;
    }

    let bg = 'rgba(0, 0, 0, 0.35)';

    if (attr === 'dark') {
        bg = 'rgba(0, 0, 0, 0.35)';
    }
    if (attr === 'light') {
        bg = 'rgba(255, 255, 255, 0.35)';
    }

    const zIndex = '9999';
    const transition = 400;
    const targetBorder = parseInt(
            getComputedStyle(target).borderWidth.replace('px', ''),
    );

    const rect = target.getBoundingClientRect();
    const { left } = rect;
    const { top } = rect;
    const width = target.offsetWidth;
    const height = target.offsetHeight;
    const dx = event.clientX - left;
    const dy = event.clientY - top;
    const maxX = Math.max(dx, width - dx);
    const maxY = Math.max(dy, height - dy);
    const style = window.getComputedStyle(target);
    const radius = Math.sqrt(maxX * maxX + maxY * maxY);
    const border = targetBorder > 0 ? targetBorder : 0;

    const ripple = document.createElement('div');
    const rippleContainer = document.createElement('div');

    ripple.className = 'ripple';
    rippleContainer.className = 'ripple-container';

    ripple.style.marginTop = '0px';
    ripple.style.marginLeft = '0px';
    ripple.style.width = '1px';
    ripple.style.height = '1px';
    ripple.style.transition = `all ${transition}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    ripple.style.borderRadius = '50%';
    ripple.style.pointerEvents = 'none';
    ripple.style.position = 'relative';
    ripple.style.zIndex = zIndex;
    ripple.style.backgroundColor = bg;

    rippleContainer.style.position = 'absolute';
    rippleContainer.style.left = `${0 - border}px`;
    rippleContainer.style.top = `${0 - border}px`;
    rippleContainer.style.height = '0';
    rippleContainer.style.width = '0';
    rippleContainer.style.pointerEvents = 'none';
    rippleContainer.style.overflow = 'hidden';

    const storedTargetPosition =
            target.style.position.length > 0
                    ? target.style.position
                    : getComputedStyle(target).position;

    if (storedTargetPosition === 'static') {
        target.style.position = 'relative';
    }

    rippleContainer.appendChild(ripple);
    target.appendChild(rippleContainer);

    ripple.style.marginLeft = `${dx}px`;
    ripple.style.marginTop = `${dy}px`;

    rippleContainer.style.width = `${width}px`;
    rippleContainer.style.height = `${height}px`;
    rippleContainer.style.borderTopLeftRadius = style.borderTopLeftRadius;
    rippleContainer.style.borderTopRightRadius = style.borderTopRightRadius;
    rippleContainer.style.borderBottomLeftRadius = style.borderBottomLeftRadius;
    rippleContainer.style.borderBottomRightRadius =
            style.borderBottomRightRadius;

    rippleContainer.style.direction = 'ltr';

    setTimeout(function () {
        ripple.style.width = `${radius * 2}px`;
        ripple.style.height = `${radius * 2}px`;
        ripple.style.marginLeft = `${dx - radius}px`;
        ripple.style.marginTop = `${dy - radius}px`;
    }, 0);

    function clearRipple() {
        setTimeout(function () {
            ripple.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        }, 250);

        setTimeout(function () {
            rippleContainer.parentNode.removeChild(rippleContainer);
        }, 850);

        target.removeEventListener('mouseup', clearRipple, false);

        setTimeout(function () {
            let clearPosition = true;
            for (let i = 0; i < target.childNodes.length; i++) {
                if (target.childNodes[i].className === 'ripple-container') {
                    clearPosition = false;
                }
            }

            if (clearPosition) {
                if (storedTargetPosition !== 'static') {
                    target.style.position = storedTargetPosition;
                } else {
                    target.style.position = '';
                }
            }
        }, transition + 250);
    }

    if (event.type === 'mousedown') {
        target.addEventListener('mouseup', clearRipple, false);
    } else {
        clearRipple();
    }
};

export const useRipple = () => {
    window.addEventListener('mousedown', rippleFunction);

    return () => {
        window.removeEventListener('mousedown', rippleFunction);
    };
};
