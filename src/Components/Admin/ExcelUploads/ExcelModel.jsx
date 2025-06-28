export default function ExcelModel(props) {
    const  {fileInputRef,handleClose,handleFileChange,handleUploadClick,fileName,handleUPload} = props
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)] bg-opacity-50 p-4">
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black cursor-pointer"
                >
                    ✕
                </button>
                <div className="flex justify-center">
                    <form onSubmit={handleUPload} className="space-y-4 mb-4">
                        <div >
                            <label className="block mb-2 text-sm font-medium text-gray-700">Upload File</label>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <input
                                value={fileName}
                                type="text"
                                onClick={handleUploadClick}
                                className="px-4 py-2 rounded border border-black"
                                placeholder="choose file"
                                readOnly
                            />
                        </div>
                    </form>
                </div>
                <div className="flex justify-end">
                    <button 
                    onClick={handleUPload}
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
                    >Upload </button> &emsp;
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}