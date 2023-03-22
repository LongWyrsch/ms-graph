import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument extends Document {

	render() {
		return (
			<Html>
				<Head>
					{/* Load the Google Charts library asynchronously */}
					<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js" async></script>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument;