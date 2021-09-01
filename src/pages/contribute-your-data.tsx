import Layout from "@components/Layout";
import LoadingIcon from "@components/LoadingIcon";
import Meta from "@components/Meta";
import React, { useReducer, useState } from "react";
import formatBytes from "utils/formatBytes";

const types = {
  AUTHOR: "AUTHOR",
  LINK: "LINK",
  FILE: "FILE",
  RESET: "RESET",
};

const initialFormState = {
  author: "",
  link: "",
  file: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.AUTHOR:
      return { ...state, author: action.value };
    case types.LINK:
      return { ...state, link: action.value };
    case types.FILE:
      return { ...state, file: action.value };
    case types.RESET:
      return initialFormState;
  }
};

export default function SubmitMissingDataPage(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [form, dispatch] = useReducer(reducer, initialFormState);

  async function handleSubmit() {
    try {
      setIsLoading(true);

      const formData = new FormData();

      formData.append("author", form.author);
      formData.append("link", form.link);
      formData.append("file", form.file);

      const response = await fetch("/api/submit-data", {
        method: "POST",
        body: formData,
      });

      const json = await response.json();

      setMessage(json.message);
      dispatch({ type: types.RESET });
    } catch (error) {
      console.error(error.message);
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout>
      <Meta
        title="Contribute your data"
        description="Contribute your data, screenshots or anything else to help us !"
        cover="https://nierrein.guide/cover-submitdata.jpg"
      />

      <section className="mt-16">
        <h2 className="overlap">Contribute your data</h2>

        <form className="flex flex-col gap-4 p-4">
          <div className="input-field">
            <input
              value={form.author}
              type="text"
              placeholder="Discord tag, email address... (optional)"
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
              placeholder="Sheet link or other (optional)"
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
                {form.file
                  ? `${form.file.name} (${formatBytes(form.file.size)})`
                  : "Choose a file..."}
              </span>
              <input
                type="file"
                onChange={(event) => {
                  dispatch({
                    type: types.FILE,
                    value: event.target.files[0],
                  });
                }}
              />

              {(form.file?.type.includes("image") && (
                <img src={URL.createObjectURL(form.file)} alt="preview image" />
              )) ||
                (!form.file && (
                  <p className="border border-dotted py-6 px-4 mt-4">
                    Please select a file
                  </p>
                ))}
            </label>
          </div>
        </form>

        <div className="flex items-start mt-8">
          <button className="btn" disabled={isLoading} onClick={handleSubmit}>
            Submit data
          </button>

          {isLoading && <LoadingIcon className="max-h-24 ml-4 -mt-6" />}
        </div>

        {message && (
          <div className="mt-8">
            <p>{message}</p>
          </div>
        )}
      </section>
    </Layout>
  );
}
