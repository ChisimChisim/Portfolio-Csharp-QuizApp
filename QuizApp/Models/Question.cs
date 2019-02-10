using System;
using System.Collections.Generic;

namespace QuizApp.Models
{
    public partial class Question
    {
        public Question()
        {
            Answer = new HashSet<Answer>();
            GradeItem = new HashSet<GradeItem>();
        }

        public int Id { get; set; }
        public string Text { get; set; }
        public int LevelId { get; set; }
        public int CategoryId { get; set; }

        public Category Category { get; set; }
        public Level Level { get; set; }
        public ICollection<Answer> Answer { get; set; }
        public ICollection<GradeItem> GradeItem { get; set; }
    }
}
