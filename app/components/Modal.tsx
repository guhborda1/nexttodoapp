import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
    modalOpen: boolean;
    setModalOpen: (open: boolean) => boolean | void;
    children: React.ReactNode
}
export const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
    return (
        <>
            <div className={`modal ${modalOpen ? 'modal-open' : ''}`}>
                <div className="modal-box overflow-visible pb-10">
                    <div className="modal-action absolute -right-5 -top-12 ">
                        <label  onClick={() => setModalOpen(false)} className="btn rounded-full"><AiOutlineClose /></label>
                    </div>
                    {children}

                </div>
            </div>
        </>)
} 