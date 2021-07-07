import Document, { Html, Head, Main, NextScript } from 'next/document'

class AppDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
        <Main />
        <NextScript />
        <div id="modal-root" />
        </body>
      </Html>
    )
  }
}

export default AppDocument