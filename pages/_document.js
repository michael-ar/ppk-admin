import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <html lang={'en'}>
        <Head>
          <title>ppk admin</title>
          <meta charSet={'utf-8'} />
          <meta
            name={'viewport'}
            content={'initial-scale=1.0, width=device-width'}
          />
          <meta name={'description'} content={'ppk admin'} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
