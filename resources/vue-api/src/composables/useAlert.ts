import { toast } from "vue-sonner";

type ToastType = "success" | "warning" | "error";

export default function toastAlert(
    title: string = '',
    description?: string,
    type: ToastType = "success"
) {
    if (type === "success") {
        toast.success(title, {
            description: description,
            action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
            },
        });
    }

    if (type === "warning") {
        toast.warning(title, {
            description: description,
        });
    }

    if (type === "error") {
        toast.error(title, {
            description: description,
        });
    }
}
