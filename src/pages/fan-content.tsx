import Head from "next/head";
import Layout from "@components/Layout";
import Corners from "@components/decorations/Corners";
import { FanContent, getAllFanContents } from "@models/fancontent";
import { useState } from "react";
import { useReducer } from "react";

interface FanContentProps {
  fanContents: FanContent[];
}

const types = {
  AUTHOR: "AUTHOR",
  LINK: "LINK",
  IMAGE: "IMAGE",
  IMAGE_PREVIEW: "IMAGE_PREVIEW",
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
  const [form, dispatch] = useReducer(reducer, initialFormState);

  async function handleSubmit() {
    try {
      setIsLoading(true);
      fetch("/api/fan-content", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log(error);
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
                  dispatch({ type: types.AUTHOR, value: event.target.value });
                }}
              />
            </div>

            <div className="input-field">
              <input
                value={form.link}
                type="url"
                placeholder="Source or portfolio link"
                onChange={(event) => {
                  dispatch({ type: types.LINK, value: event.target.value });
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

          <button className="btn" disabled={isLoading} onClick={handleSubmit}>
            Submit
          </button>
        </section>
      )}

      <section className="my-12">
        {fanContents.map((content) => (
          <ContentItem
            key={content.link}
            author={content.author}
            published_at={content.published_at}
            image={content.image}
            link={content.link}
          />
        ))}

        <Corners />
      </section>
    </Layout>
  );
}

function ContentItem({ author, published_at, image, link }): JSX.Element {
  return (
    <div className="border border-beige p-4 w-auto">
      <div className="flex justify-between">
        <h3 className="text-3xl">{author}</h3>
        <a href={link} className="btn">
          Source
        </a>
      </div>
      <img
        height={image.height}
        width={image.width}
        src={image.url}
        alt={`${author} preview image`}
        loading="lazy"
      />
      <span>Published {new Date(published_at).toLocaleString()}</span>
    </div>
  );
}

FanContentPage.getInitialProps = async () => {
  const fanContents = await getAllFanContents();

  return {
    fanContents,
  };
};

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
