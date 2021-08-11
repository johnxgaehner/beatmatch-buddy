import { toast } from "react-toast";

export default function showToastSaved(message) {
  toast(message, {
    backgroundColor: "#323131",
    color: "#ffffff",
  });
}
