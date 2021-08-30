import Image from "next/image";
import Meta from "@components/Meta";
import Layout from "@components/Layout";
import Corners from "@components/decorations/Corners";
import LoadingIcon from "@components/LoadingIcon";
import { getAllFanContents, submitFanContent } from "@models/fancontent";
import { useState, useReducer } from "react";
import formatBytes from "utils/formatBytes";
import { IoImagesOutline } from "react-icons/io5";
import { FanContent } from "@models/types";

interface FanContentProps {
  fanContents: FanContent[];
}

const types = {
  AUTHOR: "AUTHOR",
  LINK: "LINK",
  IMAGE: "IMAGE",
  RESET: "RESET",
};

const initialFormState = {
  author: "",
  link: "",
  image: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.AUTHOR:
      return { ...state, author: action.value };
    case types.LINK:
      return { ...state, link: action.value };
    case types.IMAGE:
      return { ...state, image: action.value };
    case types.RESET:
      return initialFormState;
  }
};

export default function FanContentPage({
  fanContents,
}: FanContentProps): JSX.Element {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [form, dispatch] = useReducer(reducer, initialFormState);

  async function handleSubmit() {
    let hasErrors = false;

    if (!form.author) {
      setMessage("Author is required.");
      hasErrors = true;
    }

    if (!form.link) {
      setMessage("Link is required.");
      hasErrors = true;
    }

    if (!form.image) {
      setMessage("Image is required.");
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    setMessage("");

    try {
      setIsLoading(true);
      await submitFanContent({
        author: form.author,
        link: form.link,
        image: form.image,
      });

      setMessage(
        "Your submission has been succesfully sent ! Thank you ٩(◕‿◕｡)۶"
      );

      dispatch({
        type: types.RESET,
      });
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout>
      <Meta
        title="Fan Content"
        description="View and Share NieR related artworks !"
        cover="https://nierrein.guide/cover-fancontent.jpg"
      />

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <div>
          <h2 className="text-5xl lg:text-7xl">Fan Content</h2>
          <p className="wysiwyg">
            Everyone can submit their own content related to the NieR universe.
            <ol className="mt-4">
              <li>No NSFW</li>
              <li>Post only content you own</li>
              <li>After submission, administrators will need to approve it.</li>
            </ol>
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="btn mt-4 lg:mt-0"
        >
          Submit your work
        </button>
      </div>

      {isFormOpen && (
        <section className="flex flex-col items-center mt-16">
          <h2 className="overlap">Submit your work</h2>

          {message && (
            <div className="text-xl mb-8">
              <p>{message}</p>
            </div>
          )}

          <form className="flex flex-col justify-between gap-y-4 border border-beige p-4 w-full lg:w-3/4 mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-stretch">
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
            </div>

            <div className="input-field">
              <label className="input-file border-dotted text-center">
                <div className="flex justify-center">
                  {form.image instanceof File ? (
                    <img
                      src={URL.createObjectURL(form.image)}
                      alt="uploaded image"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-y-4">
                      <p>Click to upload image</p>
                      <IoImagesOutline size={64} />
                    </div>
                  )}
                </div>
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
                {form.image instanceof File
                  ? `${form.image.name} (${formatBytes(form.image.size)})`
                  : null}
              </label>
            </div>
          </form>

          <button
            className="btn my-8"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Submit my work
          </button>

          {isLoading && <LoadingIcon className="max-h-24 ml-4 -mt-6" />}
        </section>
      )}

      <section className="my-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 gap-x-4 lg:gap-x-8 my-4">
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
  const resizedImage = image?.formats?.medium ?? image?.formats?.small;

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

      {resizedImage && (
        <Image
          layout="responsive"
          height={resizedImage.height}
          width={resizedImage.width}
          src={resizedImage.url}
          alt={`${author} preview image`}
          loading="lazy"
        />
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
