import React, { useState, useEffect } from 'react';
import { opendDB, addDocument, getAllDocuments } from '../utils/idb';

const Editor = () => {
    const [documents, setDocuments] = useState([]);
    const [currentDocument, setCurrentDocument] = useState('');

    useEffect(() => {
        getAllDocuments().then((docs) => {
            setDocuments(docs);
        fetchDocument(docs[0].id);
        });
        });
    }

    const fetchData = async () => {
        const documentsFromDB = await getAllDocuments();
        setDocuments(documentsFromDB);
        setCurrentDocument(documentsFromDB[0].content);
    };

    useEffect(() => {
        fetchData();
    }, []);
        setCurrentDocument(documentsFromDB[0].content);

    const handleSave = async () => {
        if (currentDocument.trim() !== '') {
            await addDocument(currentDocument);
            fetchDocument();
        }
    };

    return (
        <div>
            <textarea 
                value={currentDocument}
                onChange={(e) => setCurrentDocument(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>

            <div>
                <h2> Saved Documents </h2>
                <ul>
                    {documents.map((doc) => (
                        <li key={doc.id}>
                            <button onClick={() => fetchDocument(doc.id)}>
                                {doc.id}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

export default Editor;



