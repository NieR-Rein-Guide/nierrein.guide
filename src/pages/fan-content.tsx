import Head from "next/head";
import Image from "next/image";
import Layout from "@components/Layout";
import Corners from "@components/decorations/Corners";
import LoadingIcon from "@components/LoadingIcon";
import {
  FanContent,
  getAllFanContents,
  submitFanContent,
} from "@models/fancontent";
import { useState, useReducer } from "react";
import formatBytes from "utils/formatBytes";

interface FanContentProps {
  fanContents: FanContent[];
}

const types = {
  AUTHOR: "AUTHOR",
  LINK: "LINK",
  IMAGE: "IMAGE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.AUTHOR:
      return { ...state, author: action.value };
    case types.LINK:
      return { ...state, link: action.value };
    case types.IMAGE:
      return { ...state, image: action.value };
  }
};

const initialFormState = {
  author: "",
  link: "",
  image: null,
};

export default function FanContentPage({
  fanContents,
}: FanContentProps): JSX.Element {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, dispatch] = useReducer(reducer, initialFormState);

  async function handleSubmit() {
    try {
      setIsLoading(true);
      const data = await submitFanContent({
        author: form.author,
        link: form.link,
        image: form.image,
      });
      console.log(data);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout>
      <Head>
        <title>Fan Content - NieR Re[in] Guide</title>
      </Head>

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <div>
          <h2 className="text-5xl lg:text-7xl">Fan Content</h2>
          <p>
            Everyone can submit their own content related to the NieR universe.
            <br />
            ⚠️ Work in progress. The form doesn't work yet.
          </p>
        </div>

        <button onClick={() => setIsFormOpen(!isFormOpen)} className="btn">
          Submit your work
        </button>
      </div>

      {isFormOpen && (
        <section className="grid grid-cols-1 md:grid-cols-2 mt-16">
          <h2>Submit your work</h2>

          <form className="flex flex-col gap-4 border border-beige p-4">
            <div className="input-field">
              <input
                value={form.author}
                type="text"
                placeholder="Author name"
                onChange={(event) => {
                  dispatch({
                    type: types.AUTHOR,
                    value: event.target.value,
                  });
                }}
              />
            </div>

            <div className="input-field">
              <input
                value={form.link}
                type="url"
                placeholder="Source or portfolio link"
                onChange={(event) => {
                  dispatch({
                    type: types.LINK,
                    value: event.target.value,
                  });
                }}
              />
            </div>

            <div className="input-field">
              <label className="input-file">
                <span>
                  {form.image instanceof File
                    ? `${form.image.name} (${formatBytes(form.image.size)})`
                    : "Choose an image..."}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    dispatch({
                      type: types.IMAGE,
                      value: event.target.files[0],
                    });
                  }}
                />
              </label>
            </div>
          </form>

          <ContentItem
            author={form.author}
            link={form.link}
            image={{
              url:
                form.image instanceof File
                  ? URL.createObjectURL(form.image)
                  : "",
            }}
            published_at={new Date().toISOString()}
          />

          <div className="flex items-start mt-8">
            <button className="btn" disabled={isLoading} onClick={handleSubmit}>
              Submit my work
            </button>

            {isLoading && <LoadingIcon className="max-h-24 ml-4 -mt-6" />}
          </div>
          {error && (
            <div className="mt-8">
              <p>{error}</p>
            </div>
          )}
        </section>
      )}

      <section className="my-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 lg:gap-x-8">
          {fanContents.map((content) => (
            <ContentItem
              key={content.link}
              author={content.author}
              published_at={content.published_at}
              image={content.image}
              link={content.link}
            />
          ))}
        </div>

        <Corners />
      </section>
    </Layout>
  );
}

function ContentItem({
  author,
  published_at,
  image,
  link,
}: FanContent): JSX.Element {
  return (
    <div className="flex flex-col justify-between gap-y-4 border border-beige p-4 w-auto">
      <div className="flex justify-between items-stretch">
        <a href={link} rel="noopener noreferrer" target="_blank">
          <h3 className="text-3xl underline-dotted hover:no-underline">
            {author ? author : "Author"}
          </h3>
        </a>

        <a
          href={link}
          rel="noopener noreferrer"
          target="_blank"
          className="btn"
        >
          Source
        </a>
      </div>

      {(image?.formats?.medium?.url && (
        <Image
          layout="responsive"
          height={image.formats.medium.height}
          width={image.formats.medium.width}
          src={image.formats.medium.url}
          alt={`${author} preview image`}
          loading="lazy"
        />
      )) ||
        (image.url && <img src={image.url} alt="preview image" />) || (
          <p className="border border-dotted py-6 px-4">
            Please select an image
          </p>
        )}

      <span>Published {new Date(published_at).toLocaleDateString()}</span>
    </div>
  );
}

FanContentPage.getInitialProps = async () => {
  const fanContents = await getAllFanContents();

  return {
    fanContents,
  };
};
