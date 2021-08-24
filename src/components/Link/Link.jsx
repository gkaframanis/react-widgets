// https://developer.mozilla.org/en-US/docs/Web/API/History/pushState
// https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event
// https://developer.mozilla.org/en-US/docs/Web/API/PopStateEvent
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent

const Link = ({href, className, children}) => {
   
    const onClick = (e) => {
        // Check if the link was clicked holding pressed the cmd button
        // for mac or ctrl in linux and windows to open the link in a new tab.
        if (e.metakey || e.ctrlKey) {
            return;
        }
        // To avoid full page reload whenever we click to a link of a widget
        e.preventDefault();
        window.history.pushState({}, "", href);

        // To tell to the Router components that the url has changed.
        const navEvent = new PopStateEvent("popstate");
        window.dispatchEvent(navEvent);
    };

    return (
        <a href={href} className={className} onClick={onClick}>{children}</a>
    );
};

export default Link;