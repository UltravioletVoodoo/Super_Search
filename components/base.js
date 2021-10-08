import Head from "next/head";

export default function Base() {
    return (
        <div>
            <Head>
                <title>Super Search</title>
                <meta name="viewport" content="initial-scale=1.0 width=device-width" />
                {/* <link rel="shortcut icon" href="/static/favicon.ico"/> */}
            </Head>
        </div>
    );
}