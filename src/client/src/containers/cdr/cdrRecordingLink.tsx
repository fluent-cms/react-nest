import React from 'react'
import { ComponentInListProps } from '../commonProps/componentInListProps';
import { useSelector } from 'react-redux';
import { selectUser } from '../../core/auth/authSelector';

export const CRDRecordingLink = ( {item, field}: ComponentInListProps) =>{
    const recordingId = item[field.id]
    return recordingId ? <a target='_blank' href={`/api/cdr/download/${recordingId}`}>Download</a>
        : <div></div>
}