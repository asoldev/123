import { Quill } from "react-quill";

export const DEFAULT_DISTRICT_ID = "d83487bb-b592-4850-ace3-000000000005";
export const DEFAULT_PROVINCE_ID = "6c8a588c-a8cd-419d-a569-000000000001";

export const formatReactQuill = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "code-block",
];

export const modulesReactQuill = {
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["code-block"],
      ["clean"],
    ],
  },
  clipboard: {
    matchVisual: false,
  },
  imageResize: {
    modules: ["Resize", "DisplaySize"],
  },
  blotFormatter: {},
};
