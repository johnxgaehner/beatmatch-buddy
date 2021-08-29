import { toast } from "react-toast";

export default function showToast(message) {
  toast(message, {
    backgroundColor: "#323131",
    color: "#ffffff",
  });
}
