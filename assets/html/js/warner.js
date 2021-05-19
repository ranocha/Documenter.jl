function maybeAddWarning () {
    // DOCUMENTER_NEWEST is defined in versions.js, DOCUMENTER_CURRENT_VERSION in siteinfo.js
    if (window.DOCUMENTER_NEWEST && window.DOCUMENTER_CURRENT_VERSION ) {
        // Current version is not a version number, so we can't tell if it's the newest version. Abort.
        if (!/v(\d+\.)*\d+/.test(window.DOCUMENTER_CURRENT_VERSION)) {
            return
        }
        // Only add a warning to old versions.
        if (window.DOCUMENTER_NEWEST === window.DOCUMENTER_CURRENT_VERSION) {
            return
        }
        // Add a noindex meta tag (unless one exists) so that search engines don't index this version of the docs.
        if (document.body.querySelector('meta[name="robots"]') === null) {
            const meta = document.createElement('meta');
            meta.name = 'robots';
            meta.content = 'noindex';

            document.getElementsByTagName('head')[0].appendChild(meta);
        };

        const div = document.createElement('div');
        div.classList.add('outdated-warning-overlay');
        const closer = document.createElement('button');
        closer.classList.add('outdated-warning-closer', 'delete');
        closer.addEventListener('click', function () {
            document.body.removeChild(div);
        });
        const href = window.documenterBaseURL + '/../' + window.DOCUMENTER_NEWEST;
        div.innerHTML = 'This is an old version of the documentation. <br> <a href="' + href + '">Go to the newest version</a>.';
        div.appendChild(closer);
        document.body.appendChild(div);
    };
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', maybeAddWarning);
} else {
    maybeAddWarning();
};
