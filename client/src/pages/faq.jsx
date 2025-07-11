// src/pages/Faq.jsx
import React from "react";
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails, useTheme } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../theme";

const faqData = [
  {
    question: "How do I start trading on FinFolio?",
    answer: "Sign up for an account, complete your KYC, and access the dashboard to begin trading."
  },
  {
    question: "Is FinFolio available in my country?",
    answer: "FinFolio is accessible in most countries. Please check with our support team if you're unsure."
  },
  {
    question: "What fees are associated with trading?",
    answer: "We charge a minimal fee per transaction. Details are available in the pricing section."
  },
  {
    question: "How can I withdraw funds?",
    answer: "You can withdraw funds anytime via your dashboard's wallet section."
  },
  {
    question: "Is FinFolio safe to use?",
    answer: "Yes, we use industry-grade encryption and security protocols to keep your data and funds secure."
  }
];

export default function Faq() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ bgcolor: colors.primary[900], color: colors.grey[100], minHeight: "100vh", py: 6 }}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Typography align="center" sx={{ mb: 6 }}>
          Answers to the most common questions about getting started and using FinFolio.
        </Typography>

        {faqData.map((faq, index) => (
          <Accordion key={index} sx={{ backgroundColor: colors.primary[700], color: colors.grey[100], mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: colors.grey[100] }} />}>
              <Typography fontWeight={600}>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}