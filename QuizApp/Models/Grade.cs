using System;
using System.Collections.Generic;

namespace QuizApp.Models
{
    public partial class Grade
    {
        public Grade()
        {
            GradeItem = new HashSet<GradeItem>();
        }

        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int CategoryId { get; set; }
        public int LevelId { get; set; }

        public Category Category { get; set; }
        public Level Level { get; set; }
        public ICollection<GradeItem> GradeItem { get; set; }
    }
}
