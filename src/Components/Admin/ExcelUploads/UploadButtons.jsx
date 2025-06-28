export default function UploadButtons(props) {
    const {add , download, upload} = props;
    return (
        <div className="flex justify-end gap-10 p-4">
            <button onClick={add} className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg cursor-pointer">Add Career</button>
            <button onClick={download} className="bg-gray-600 hover:bg-gray-700 text-gray-800 text-white p-3 rounded-lg cursor-pointer">Download Template</button>
            <button onClick={upload} className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg cursor-pointer"> Upload Excel</button>
        </div>
    )
}