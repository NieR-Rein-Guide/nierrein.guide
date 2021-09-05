import Head from "next/head";
import { meta as defaultMeta, SITE_URL } from "@config/constants";
import { useRouter } from "next/router";

interface MetaProps {
  title?: string;
  description?: string;
  url?: string;
  cover?: string;
}

export default function Meta({
  title,
  description,
  url,
  cover,
}: MetaProps): JSX.Element {
  const router = useRouter();

  const metaTitle = title || defaultMeta.title;
  const metaDescription = description || defaultMeta.description;
  const metaUrl = url || `${SITE_URL}${router.asPath}`;
  const metaImage = cover || defaultMeta.cover;

  return (
    <Head>
      <title>
        {title ? `${metaTitle} - ${defaultMeta.title}` : defaultMeta.title}
      </title>
      <meta name="description" content={metaDescription} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      {metaImage && <meta property="og:image" content={metaImage} />}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:description" content={metaDescription} />

      {/* Twitter */}
      <meta property="twitter:url" content={metaUrl} />
      <meta property="twitter:title" content={metaTitle} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={metaImage}></meta>
      <meta
        name="twitter:card"
        content={metaImage ? "summary_large_image" : "summary"}
      />
    </Head>
  );
}
