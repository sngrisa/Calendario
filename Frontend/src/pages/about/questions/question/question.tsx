import { IQuestion } from '../questions';
import "./question.scss";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@radix-ui/react-accordion';
import { Button } from '../../../../components/ui/button';
import { FaQuestionCircle } from 'react-icons/fa';


const Question = ({ question }: { question: IQuestion }) => {
    return (
        <>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem className='accordionItem' value={question.id?.toString() || 'item-1'}>
                    <AccordionTrigger className='accordionTrigger w-full'>
                        <Button
                            className='buttonQuestion flex items-center justify-start bg-transparent text-purple-950 hover:text-purple-800 transition duration-200 ease-in-out'
                            style={{ height: "42px" }} variant={'ghost'}
                            aria-expanded="false"
                        >
                            <span className='mr-2 text-purple-700 text-2xl'><FaQuestionCircle /></span>
                            {question.question}
                        </Button>
                    </AccordionTrigger>
                    <AccordionContent className='accordionContent text-2xl text-center'>
                        {question.answer}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </>
    )
}

export default Question;